export default function CopyrightBar() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-4 border-t border-[#E5E7EB]">
      <div className="flex justify-between text-sm text-[#0D0D2B]/60">
        <span>Apex Digital © {new Date().getFullYear()}</span>
        <span>India &amp; Global</span>
      </div>
    </div>
  );
}
