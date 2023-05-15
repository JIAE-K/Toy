import Basic from "./Basic/Basic";
import Optional from "./Optional/Optional";

export default function Toolbar() {
  return (
    <div className="flex gap-x-7 items-center bg-blue-100 h-10">
      <Basic />
      <Optional />
    </div>
  );
}
