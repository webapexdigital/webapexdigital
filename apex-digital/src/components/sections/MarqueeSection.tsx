const IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
];

const ALL = [...IMAGES, ...IMAGES];

export default function MarqueeSection() {
  return (
    <section className="w-full mt-16 md:mt-20 mb-16 overflow-hidden">
      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {ALL.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="h-[280px] md:h-[500px] object-cover rounded-2xl shadow-lg mx-3 shrink-0"
          />
        ))}
      </div>
    </section>
  );
}
