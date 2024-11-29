import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function FilterStaus() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Status
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="pending">Pending</DropdownItem>
        <DropdownItem key="in_progress">In Progress</DropdownItem>
        <DropdownItem key="completed">Completed</DropdownItem>
        <DropdownItem key="archived">Archive</DropdownItem>
        <DropdownItem key="clear" className="text-danger" color="danger">
          Clear Filter
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}