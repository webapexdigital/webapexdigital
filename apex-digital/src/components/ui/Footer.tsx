import { ArrowUpRight } from 'lucide-react';
import Button from './Button';

export default function Footer() {
  return (
    <footer className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <Button href="mailto:hello@apexdigital.in" variant="primary">
          Start a chat
        </Button>
        <div className="flex items-center gap-8">
          <ArrowUpRight className="w-5 h-5 text-[#0D0D2B] shrink-0" />
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <a href="#pricing" className="text-base text-[#0D0D2B] hover:opacity-60 transition-opacity">Services</a>
              <a href="#work"    className="text-base text-[#0D0D2B] hover:opacity-60 transition-opacity">Work</a>
              <a href="#contact" className="text-base text-[#0D0D2B] hover:opacity-60 transition-opacity">About</a>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/webapexdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[#0D0D2B] hover:opacity-60 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="mailto:hello@apexdigital.in"
                className="text-base text-[#0D0D2B] hover:opacity-60 transition-opacity"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
