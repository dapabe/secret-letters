import { useLetterStore } from "#/stores/letter.store";
import { IconWritingSign } from "@tabler/icons-react";

export function SideBar() {
  const { toggleModal } = useLetterStore();
  return (
    <section className="hidden md:block">
      <ul className="menu rounded-box bg-base-200">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <button className="btn btn-outline" onClick={toggleModal}>
        <IconWritingSign />
        Redactar
      </button>
    </section>
  );
}
