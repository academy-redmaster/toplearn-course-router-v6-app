import { Button } from "@nextui-org/button";

export default function CopyRight() {
  return (
    <div className="flex items-center justify-between max-w-7xl mx-auto border-t py-6 px-4 xl:px-0 *:text-sm">
      <div className="space-x-4">
        <Button isIconOnly variant="light">
          <i className="ri-instagram-line text-2xl"></i>
        </Button>
        <Button isIconOnly variant="light">
          <i className="ri-telegram-2-line text-2xl"></i>
        </Button>
      </div>
      <p>
        <i className="ri-copyright-line"></i>
        2025 Redmaster Academy. all right reserved
      </p>
    </div>
  );
}
