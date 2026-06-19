import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { getBySlug, generateLocationContent } from './src/data/locations';
import { getServiceBySlug, generateServiceContent } from './src/data/services';
import { getPostBySlug } from './src/data/blog';

// Initialize core server
async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. API routes (Keep them simple as required by guidelines)
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  // Resolve SEO content to inject serverside
  function getSEOForPath(urlPath: string) {
    let title = "DESENTUPIDORA CURITIBA 24 HORAS | Orçamento Grátis Água Fácil";
    let description = "Desentupidora Água Fácil Curitiba. Atendimento urgente 24h em todos os bairros e região metropolitana. Desentupimento de esgotos, vasos, pias, ralos e caixas de gordura com garantia.";
    let keywords = "desentupidora curitiba, desentupidora em curitiba, desentupidora 24 horas curitiba, desentupimento curitiba, limpa fossa curitiba, hidrojateamento curitiba, desentupidora perto de mim, desentupidora emergencia curitiba, limpeza de caixa de gordura curitiba";
    let schema: any = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Desentupidora Água Fácil Curitiba",
      "image": "https://img.supremamidia.com/suprema-img.png",
      "@id": "https://aguafacil.app.br/#localbusiness",
      "url": "https://aguafacil.app.br",
      "telephone": "+55-41-3345-1194",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Central de Atendimento Curitiba",
        "addressLocality": "Curitiba",
        "addressRegion": "PR",
        "postalCode": "80000-000",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -25.4284,
        "longitude": -49.2733
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    };

    try {
      if (urlPath === '/' || urlPath === '') {
        // Keeps default home SEO
      } else if (urlPath.startsWith('/servico/')) {
        const slug = urlPath.substring(9);
        const sInfo = getServiceBySlug(slug);
        if (sInfo) {
          const sContent = generateServiceContent(sInfo);
          title = `${sContent.title} | Água Fácil`;
          description = `${sContent.intro.substring(0, 150)}... Soluções rápidas e limpas de desentupimento com atendimento imediato 24 Horas.`;
          keywords = `${sInfo.name} curitiba, ${sInfo.name} em curitiba, desentupidora curitiba, desentupir ${sInfo.name.toLowerCase()}`;
          schema = [
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": sInfo.name,
              "description": sInfo.shortDesc,
              "provider": {
                "@type": "LocalBusiness",
                "name": "Desentupidora Água Fácil Curitiba",
                "telephone": "+55-41-3345-1194"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": sContent.faqs.map((f: any) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.answer
                }
              }))
            }
          ];
        }
      } else if (urlPath.startsWith('/bairro/') || urlPath.startsWith('/cidade/')) {
        const isBairro = urlPath.startsWith('/bairro/');
        const slug = isBairro ? urlPath.substring(8) : urlPath.substring(8);
        const lInfo = getBySlug(slug);
        if (lInfo) {
          const lContent = generateLocationContent(lInfo);
          title = `${lContent.title} | Curitiba PR`;
          description = `Desentupidora Água Fácil ${lInfo.type === 'city' ? `em ${lInfo.name}` : `no bairro ${lInfo.name}`}. Atendimento imediato 24h em até 30 minutos com orçamento grátis.`;
          keywords = `desentupidora ${lInfo.name}, desentupimento ${lInfo.name}, desentupidora 24h ${lInfo.name}, limpa fossa ${lInfo.name}`;
          schema = [
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": `Desentupidora Água Fácil - Unidade ${lInfo.name}`,
              "telephone": "+55-41-3345-1194",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": lInfo.lat,
                "longitude": lInfo.lng
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": lContent.faqs.map((f: any) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.answer
                }
              }))
            }
          ];
        }
      } else if (urlPath === '/blog') {
        title = "Blog Técnico sobre Desentupimentos e Manutenções Hidráulicas";
        description = "Confira dicas fundamentais de prevenção de entupimentos de pias, vasos, ralos, além de esclarecer preços, legislações de caixas de gordura e mais.";
        keywords = "blog desentupidora, dicas encanador, como desentupir cano, evitar entupimento pia";
      } else if (urlPath.startsWith('/blog/')) {
        const slug = urlPath.substring(6);
        const post = getPostBySlug(slug);
        if (post) {
          title = `${post.title} | Dicas Úteis Água Fácil`;
          description = post.shortDesc;
          keywords = "blog desentupidora, desentupir esgoto, dicas de encanamento";
          schema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": post.publishDate,
            "description": post.shortDesc
          };
        }
      }
    } catch (e) {
      console.error("Meta parse error on route:", urlPath, e);
    }

    return { title, description, keywords, schema };
  }

  // Inject parsed header variables dynamically into HTML string
  function injectHTMLMeta(html: string, path: string): string {
    const seo = getSEOForPath(path);
    const canonical = `https://aguafacil.app.br${path}`;

    // Replace <title> and inject real meta elements for Google crawl preview
    let modifiedHtml = html;

    // 1. Title inject
    if (modifiedHtml.includes("<title>")) {
      modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`);
    } else {
      modifiedHtml = modifiedHtml.replace("</head>", `<title>${seo.title}</title>\n</head>`);
    }

    // 2. Canonical and descriptive headers tag injection
    const metaTags = `
  <link rel="canonical" href="${canonical}" />
  <meta name="description" content="${seo.description}" />
  <meta name="keywords" content="${seo.keywords}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta property="og:title" content="${seo.title}" />
  <meta property="og:description" content="${seo.description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://img.supremamidia.com/suprema-img.png" />
  <script type="application/ld+json" class="dynamic-schema">
    ${JSON.stringify(seo.schema, null, 2)}
  </script>
`;

    modifiedHtml = modifiedHtml.replace("</head>", `${metaTags}\n</head>`);
    return modifiedHtml;
  }

  if (process.env.NODE_ENV !== "production") {
    // DEV MODE: Mount Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);
    app.use(express.static(path.join(process.cwd(), "public")));

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      // Filter out Static assets
      if (url.includes('.') && !url.endsWith('.html')) {
        return next();
      }

      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        // Apply Vite HTML transformations
        template = await vite.transformIndexHtml(url, template);
        // Inject SEO metrics metadata for local SEO preview tests
        const html = injectHTMLMeta(template, url);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });

  } else {
    // PROD MODE: Serve the built client files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));

    app.get("*", (req, res, next) => {
      const url = req.originalUrl;
      // Filter out static assets
      if (url.includes('.') && !url.endsWith('.html')) {
        return next();
      }

      try {
        const templatePath = path.join(distPath, "index.html");
        if (fs.existsSync(templatePath)) {
          let template = fs.readFileSync(templatePath, "utf-8");
          const html = injectHTMLMeta(template, url);
          res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } else {
          res.status(404).send("Index template builds not found.");
        }
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Água Fácil Server] Running beautifully in port ${PORT}`);
  });
}

startServer();
