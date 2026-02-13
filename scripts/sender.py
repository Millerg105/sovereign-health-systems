
import smtplib
import csv
import time
import datetime
import os
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# --- CONFIGURATION ---
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
# Ideally, load these from environment variables or a secure config file
EMAIL_ADDRESS = "YOUR_EMAIL@gmail.com" 
EMAIL_PASSWORD = "YOUR_APP_PASSWORD" # Generate at: https://myaccount.google.com/apppasswords
DAILY_LIMIT = 45 # Keep under 50 to start safely
DELAY_BETWEEN_EMAILS = 60 # Seconds (minimum)
LOG_FILE = "outreach.log"
CSV_FILE = "../marketing/leads.csv"

# --- EMAIL TEMPLATE ---
# You can modify this or load from a file
SUBJECT = "Quick question for {{Company}}"
BODY = """Hi {{Name}},

I noticed {{Company}} is doing great work in the space, but I see an opportunity to streamline your patient acquisition.

We help clinics like yours automate their lead follow-up so you stop losing revenue to missed calls.

Open to a brief chat?

Best,
[Your Name]
Sovereign Health Systems
"""

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"[{timestamp}] {message}"
    print(entry)
    with open(LOG_FILE, "a") as f:
        f.write(entry + "\n")

def send_email(to_email, name, company):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg['Subject'] = SUBJECT.replace("{{Company}}", company).replace("{{Name}}", name)

    body_content = BODY.replace("{{Company}}", company).replace("{{Name}}", name)
    msg.attach(MIMEText(body_content, 'plain'))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_ADDRESS, to_email, text)
        server.quit()
        log(f"SUCCESS: Sent to {to_email}")
        return True
    except Exception as e:
        log(f"ERROR: Failed to send to {to_email}: {str(e)}")
        return False

def main():
    if EMAIL_PASSWORD == "YOUR_APP_PASSWORD":
        print("ERROR: Please configure your EMAIL_PASSWORD in the script.")
        print("Go to https://myaccount.google.com/apppasswords to generate one.")
        return

    log("--- Starting Outreach Run ---")
    
    try:
        if not os.path.exists(CSV_FILE):
             print(f"Error: {CSV_FILE} not found. Please create it first.")
             return

        with open(CSV_FILE, mode='r', encoding='utf-8-sig') as csvfile:
            reader = csv.DictReader(csvfile)
            leads = list(reader)
            
        count = 0
        for lead in leads:
            if count >= DAILY_LIMIT:
                log("Daily limit reached. Stopping.")
                break

            email = lead.get('Email')
            name = lead.get('Name')
            company = lead.get('Company')
            status = lead.get('Status', '').lower()

            if not email or status == 'sent':
                continue

            log(f"Processing: {name} at {company}...")
            
            if send_email(email, name, company):
                count += 1
                # In a real app, you'd update the CSV status here
                time.sleep(DELAY_BETWEEN_EMAILS)
            
    except Exception as e:
        log(f"CRITICAL ERROR: {str(e)}")

    log("--- Run Complete ---")

if __name__ == "__main__":
    main()
