import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function FilterPriority() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Priority
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="low">Low</DropdownItem>
        <DropdownItem key="medium">medium</DropdownItem>
        <DropdownItem key="high">High</DropdownItem>
        <DropdownItem key="clear" className="text-danger" color="danger">
         Clear Filter
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}