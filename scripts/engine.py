
import csv
import json
import os
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import time
import datetime
import argparse

# --- CONFIGURATION (User Editable) ---
ZAPIER_WEBHOOK_URL = "" # Paste your Zapier 'Catch Hook' URL here for Drafts
SMTP_EMAIL = "YOUR_EMAIL@gmail.com"
SMTP_PASSWORD = "YOUR_APP_PASSWORD"
CSV_FILE = "../marketing/leads.csv"
LOG_FILE = "engine.log"

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")
    with open(LOG_FILE, "a") as f:
        f.write(f"[{timestamp}] {message}\n")

# --- ENRICHMENT LOGIC ---
def enrich_lead(lead):
    """
    Attempts to guess email if missing, using domain patterns.
    """
    if lead.get('Email') and lead.get('Email').strip():
        return lead # Already has email

    company = lead.get('Company', '')
    website = lead.get('Website', '')
    
    domain = ""
    if website:
        # Extract domain from website logic
        domain = website.replace("https://", "").replace("http://", "").replace("www.", "").split('/')[0]
    elif company:
        # Guess domain from company name
        domain = company.lower().replace(" ", "").replace(",", "").replace(".", "") + ".co.uk" # Defaulting to UK based on user context
    
    if domain:
        guessed_email = f"info@{domain}"
        lead['Email'] = guessed_email
        lead['Notes'] = lead.get('Notes', '') + " [Enriched: Guessed Email]"
        log(f"Enriched {company}: Guessed {guessed_email}")
    
    return lead

# --- TEMPLATE LOGIC ---
def generate_body(lead, template_type="aida"):
    name = lead.get('Name', 'Partner')
    company = lead.get('Company', 'your clinic')
    
    # Simple templates based on Playbook
    if template_type == "aida":
        return f"""Hi {name},

I saw {company} doing great work recently. Congrats.

Most clinic owners I speak to are struggling to turn traffic into booked appointments without hiring more staff.

We built a system that recovered £2,450 in missed revenue for a similar clinic last month by automating follow-ups.

Open to a 5-minute chat to see how it works?

Best,
[Your Name]"""
    
    elif template_type == "pas":
        return f"""Hi {name},

Are you tracking how many patient calls go unanswered at {company} each week?

For most clinics, missed calls equal £50k+ in lost revenue per year. It's a silent leak.

We install a simple "Missed Call Text Back" system that instantly engages those leads so you never lose them.

Worth exploring?

Best,
[Your Name]"""
    
    return ""

def send_via_zapier(lead, body):
    if not ZAPIER_WEBHOOK_URL:
        log("ERROR: Zapier Webhook URL not configured.")
        return False
        
    payload = {
        "to": lead.get('Email'),
        "subject": f"Quick question re: {lead.get('Company')}",
        "body": body,
        "name": lead.get('Name'),
        "company": lead.get('Company')
    }
    
    try:
        response = requests.post(ZAPIER_WEBHOOK_URL, json=payload)
        if response.status_code == 200:
            log(f"Zapier Draft Triggered: {lead.get('Email')}")
            return True
        else:
            log(f"Zapier Error {response.status_code}: {response.text}")
            return False
    except Exception as e:
        log(f"Zapier Exception: {str(e)}")
        return False

def send_via_smtp(lead, body):
    """Sends actual email via SMTP"""
    if "YOUR_APP_PASSWORD" in SMTP_PASSWORD:
        log("ERROR: SMTP Password not configured.")
        return False

    msg = MIMEMultipart()
    msg['From'] = SMTP_EMAIL
    msg['To'] = lead.get('Email')
    msg['Subject'] = f"Quick question re: {lead.get('Company')}"
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.sendmail(SMTP_EMAIL, lead.get('Email'), msg.as_string())
        server.quit()
        log(f"SMTP Sent: {lead.get('Email')}")
        return True
    except Exception as e:
        log(f"SMTP Error: {str(e)}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Lead Engine: Automate Outreach')
    parser.add_argument('--mode', choices=['zapier', 'smtp', 'print'], default='print', help='How to output the drafts')
    args = parser.parse_args()

    log(f"--- Engine Started (Mode: {args.mode}) ---")
    
    if not os.path.exists(CSV_FILE):
        log(f"File not found: {CSV_FILE}")
        return

    leads = []
    with open(CSV_FILE, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        leads = list(reader)

    count = 0
    for lead in leads:
        # status check
        if lead.get('Status', '').lower() in ['sent', 'drafted']:
            continue
            
        # 1. Enrich
        lead = enrich_lead(lead)
        
        if not lead.get('Email'):
            log(f"Skipping {lead.get('Company')} - No Email Found/Guessable")
            continue

        # 2. Generate
        body = generate_body(lead, template_type="aida")
        
        # 3. Action
        success = False
        if args.mode == 'zapier':
            success = send_via_zapier(lead, body)
        elif args.mode == 'smtp':
            success = send_via_smtp(lead, body)
            time.sleep(2) # Safety delay
        else: # print
            print(f"\n--- DRAFT FOR {lead.get('Email')} ---\n{body}\n-----------------------------")
            success = True # Simulation success
            
        if success:
            count += 1
            # In a real rigorous app, we'd update the CSV status here. 
            # For simplicity, we just log.
    
    log(f"--- Batch Complete: Processed {count} leads ---")

if __name__ == "__main__":
    main()
