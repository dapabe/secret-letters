"use client";
import { useLetterStore } from "#/stores/letter-preview.store";
import { IconWritingSign } from "@tabler/icons-react";

export function SideBar() {
  const { toggleModal } = useLetterStore();
  return (
    <section className="space-y-2">
      <ul className="menu rounded-box bg-base-200">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <button className="btn btn-primary" onClick={toggleModal}>
        <IconWritingSign />
        Redactar
      </button>
    </section>
  );
}
