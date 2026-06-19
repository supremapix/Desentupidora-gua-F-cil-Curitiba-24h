import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
  schema?: Record<string, any> | Record<string, any>[];
  ogImage?: string;
}

export default function EnhancedSEO({ title, description, canonicalUrl, keywords, schema, ogImage }: SEOProps) {
  useEffect(() => {
    // Dynamic Client-side title syncing
    document.title = title;

    // Help search engines map the exact page canonical identity
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Sync Meta Description
    let metaDesc = document.querySelector("meta[name='description']") as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Sync Meta Keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector("meta[name='keywords']") as HTMLMetaElement;
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Sync Open Graph Title
    let ogTitle = document.querySelector("meta[property='og:title']") as HTMLMetaElement;
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Sync Open Graph Description
    let ogDesc = document.querySelector("meta[property='og:description']") as HTMLMetaElement;
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Sync Open Graph URL
    let ogUrl = document.querySelector("meta[property='og:url']") as HTMLMetaElement;
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);

    // Sync Open Graph Image
    const defaultImage = "https://img.aguafacil.app.br/agua-facil-desentupidora-em-curitiba-bairros.jpg";
    let ogImgTag = document.querySelector("meta[property='og:image']") as HTMLMetaElement;
    if (!ogImgTag) {
      ogImgTag = document.createElement('meta');
      ogImgTag.setAttribute('property', 'og:image');
      document.head.appendChild(ogImgTag);
    }
    ogImgTag.setAttribute('content', ogImage || defaultImage);

    // Sync Robots directives
    let metaRobots = document.querySelector("meta[name='robots']") as HTMLMetaElement;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Sync JSON-LD Structured Data Schema Markup
    if (schema) {
      // Remove any existing dynamic schemas first
      const existingRaw = document.querySelectorAll('script[type="application/ld+json"].dynamic-schema');
      existingRaw.forEach(el => el.remove());

      const schemasToInject = Array.isArray(schema) ? schema : [schema];
      schemasToInject.forEach((sc, i) => {
        const scriptSchema = document.createElement('script');
        scriptSchema.setAttribute('type', 'application/ld+json');
        scriptSchema.classList.add('dynamic-schema');
        scriptSchema.setAttribute('id', `dynamic-schema-${i}`);
        scriptSchema.text = JSON.stringify(sc);
        document.head.appendChild(scriptSchema);
      });
    }

    // Resource hints (Preload google fonts or API connections)
    const hints = [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      { rel: 'dns-prefetch', href: 'https://wa.me' },
      { rel: 'dns-prefetch', href: 'https://maps.google.com' }
    ];

    hints.forEach(hint => {
      const selector = `link[rel="${hint.rel}"][href="${hint.href}"]`;
      if (!document.querySelector(selector)) {
        const link = document.createElement('link');
        link.setAttribute('rel', hint.rel);
        link.setAttribute('href', hint.href);
        if (hint.crossorigin) {
          link.setAttribute('crossorigin', hint.crossorigin);
        }
        document.head.appendChild(link);
      }
    });

  }, [title, description, canonicalUrl, keywords, schema, ogImage]);

  return (
    <div className="sr-only" aria-hidden="true" style={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute' }}>
      <img 
        src="https://img.aguafacil.app.br/agua-facil-desentupidora-em-curitiba-bairros.jpg" 
        alt={`${title} - ${description}`} 
        title={title}
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
}
