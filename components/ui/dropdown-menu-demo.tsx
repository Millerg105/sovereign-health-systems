import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Pencil, Trash, Copy } from "lucide-react";

const DropdownMenuDemo = () => {
  return (
    <DropdownMenu
      options={[
        {
          label: "Edit",
          onClick: () => {},
          Icon: <Pencil className="h-4 w-4" />,
        },
        {
          label: "Duplicate",
          onClick: () => {},
          Icon: <Copy className="h-4 w-4" />,
        },
        {
          label: "Delete",
          onClick: () => {},
          Icon: <Trash className="h-4 w-4" />,
        },
      ]}
    >
      Options
    </DropdownMenu>
  );
};

export { DropdownMenuDemo };
