import { useRef, useEffect, useState } from 'react';

const PROJECTS = [
  {
    name: 'Orion AI',
    description: 'AI video campaign that generated $2M in attributed revenue for a Series A SaaS startup',
    gif: 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  },
  {
    name: 'AutoFlow',
    description: 'End-to-end business automation cutting operational overhead by 60%',
    gif: 'https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif',
  },
  {
    name: 'Cosmos 3D',
    description: 'Immersive 3D scroll experience that tripled time-on-site for a Web3 protocol',
    gif: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  },
];

function ProjectItem({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${index * 0.12}s`,
      }}
    >
      <div className="ml-20 md:ml-28 mb-5">
        <h3 className="font-mondwest text-2xl md:text-3xl font-semibold text-[#0D0D2B] mb-1 leading-tight">
          {project.name}
        </h3>
        <p className="text-sm md:text-base text-[#0D0D2B]/70">{project.description}</p>
      </div>
      <img
        src={project.gif}
        alt={project.name}
        loading="lazy"
        className="w-full rounded-2xl shadow-lg object-cover h-[300px] md:h-[500px]"
      />
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12" id="work">
      <div className="flex flex-col gap-16 md:gap-20">
        {PROJECTS.map((p, i) => (
          <ProjectItem key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
