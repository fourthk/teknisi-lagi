import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ActionMenuProps {
  itemId: string;
  detailPath: string;
  historyPath: string;
  editPath?: string;
  onEdit?: () => void;
}

const ActionMenu = ({ itemId, detailPath, historyPath, editPath, onEdit }: ActionMenuProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        {(editPath || onEdit) && (
          <DropdownMenuItem
            onClick={() => onEdit ? onEdit() : navigate(editPath!)}
            className="cursor-pointer hover:bg-muted"
          >
            Edit
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => navigate(detailPath)}
          className="cursor-pointer hover:bg-muted"
        >
          Detail
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate(historyPath)}
          className="cursor-pointer hover:bg-muted"
        >
          History
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
