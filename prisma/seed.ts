import { PrismaClient } from '@prisma/client';

// We use dynamic import for bcryptjs since this is a seed script
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // ============================================
  // 1. Create Admin User
  // ============================================
  // Password: admin123 (change in production!)
  // Using a pre-hashed password for simplicity in seed
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.hash('admin123', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@newshub.com' },
    update: {},
    create: {
      email: 'admin@newshub.com',
      passwordHash: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });
  console.log('✅ Admin user created:', adminUser.email);

  // ============================================
  // 2. Create Categories
  // ============================================
  const categoriesData = [
    { name: 'India', slug: 'india', description: 'National news from across India', sortOrder: 1 },
    { name: 'World', slug: 'world', description: 'International news and global affairs', sortOrder: 2 },
    { name: 'Politics', slug: 'politics', description: 'Political news, elections, and governance', sortOrder: 3 },
    { name: 'Business', slug: 'business', description: 'Business, economy, and market news', sortOrder: 4 },
    { name: 'Technology', slug: 'technology', description: 'Technology, startups, and innovation', sortOrder: 5 },
    { name: 'Sports', slug: 'sports', description: 'Sports news, scores, and highlights', sortOrder: 6 },
  ];

  const categories: Record<string, { id: string }> = {};
  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories[cat.slug] = category;
  }
  console.log('✅ Categories created:', Object.keys(categories).join(', '));

  // ============================================
  // 3. Create Authors
  // ============================================
  const authorsData = [
    {
      name: 'Priya Sharma',
      slug: 'priya-sharma',
      bio: 'Senior political correspondent with over 10 years of experience covering Indian politics and governance.',
      status: 'ACTIVE',
    },
    {
      name: 'Rohit Gupta',
      slug: 'rohit-gupta',
      bio: 'Technology editor specializing in startups, AI, and digital innovation in India.',
      status: 'ACTIVE',
    },
    {
      name: 'Ananya Reddy',
      slug: 'ananya-reddy',
      bio: 'Business journalist covering markets, economy, and corporate news.',
      status: 'ACTIVE',
    },
  ];

  const authors: Record<string, { id: string }> = {};
  for (const auth of authorsData) {
    const author = await prisma.author.upsert({
      where: { slug: auth.slug },
      update: {},
      create: auth,
    });
    authors[auth.slug] = author;
  }
  console.log('✅ Authors created:', Object.keys(authors).join(', '));

  // ============================================
  // 4. Create Sample Articles
  // ============================================
  const articlesData = [
    {
      title: 'India Launches Ambitious Green Hydrogen Mission Targeting 5 Million Tonnes by 2030',
      slug: 'india-launches-green-hydrogen-mission-2030',
      excerpt: 'The government has unveiled a comprehensive plan to make India a global hub for green hydrogen production, with Rs 19,744 crore allocated for the National Green Hydrogen Mission.',
      content: `<p>In a major step towards clean energy transition, the Indian government has launched an ambitious Green Hydrogen Mission targeting production of 5 million tonnes of green hydrogen annually by 2030.</p>

<p>The National Green Hydrogen Mission, with an outlay of Rs 19,744 crore, aims to position India as a global leader in green hydrogen production and export. The mission will help India meet its climate commitments and reduce dependence on fossil fuel imports.</p>

<h2>Key Highlights of the Mission</h2>

<p>The mission encompasses several strategic initiatives:</p>
<ul>
<li>Establishing green hydrogen production hubs across the country</li>
<li>Creating demand through mandates in fertilizer and petroleum refining sectors</li>
<li>Supporting R&D for electrolyser technology and storage solutions</li>
<li>Developing export infrastructure for green hydrogen and its derivatives</li>
</ul>

<p>Industry experts believe this initiative could generate over 600,000 jobs and attract investments worth Rs 8 lakh crore by 2030. The steel, cement, and transportation sectors are expected to be major beneficiaries of this transition.</p>

<h2>Global Context</h2>

<p>India's green hydrogen mission comes at a time when countries worldwide are racing to build clean hydrogen economies. The European Union, Japan, South Korea, and Australia have all announced significant hydrogen strategies.</p>

<p>With abundant renewable energy resources, particularly solar and wind, India has a natural advantage in producing cost-competitive green hydrogen. Analysts project that Indian green hydrogen could be among the cheapest globally by 2030.</p>`,
      authorSlug: 'ananya-reddy',
      categorySlug: 'india',
      isBreaking: true,
      isFeatured: true,
      sources: [
        { name: 'Ministry of New and Renewable Energy', url: 'https://mnre.gov.in', sourceType: 'GOVERNMENT_RELEASE' },
        { name: 'Press Information Bureau', url: 'https://pib.gov.in', sourceType: 'OFFICIAL_STATEMENT' },
      ],
    },
    {
      title: 'Supreme Court Upholds Right to Privacy in Landmark Digital Data Protection Ruling',
      slug: 'supreme-court-digital-data-protection-ruling',
      excerpt: 'In a unanimous decision, the Supreme Court has reinforced citizens\' right to digital privacy, setting new precedents for data protection in India.',
      content: `<p>The Supreme Court of India has delivered a landmark ruling reinforcing the fundamental right to digital privacy, with significant implications for how companies and government agencies handle citizen data.</p>

<p>The nine-judge bench unanimously held that the right to privacy is an intrinsic part of the right to life and personal liberty guaranteed under Article 21 of the Constitution.</p>

<h2>Key Implications</h2>

<p>The ruling establishes several important principles for the digital age:</p>
<ul>
<li>Data collection must be proportionate and necessary</li>
<li>Citizens have the right to know what data is being collected about them</li>
<li>Companies must obtain informed consent before processing personal data</li>
<li>Government surveillance must meet the test of legality, necessity, and proportionality</li>
</ul>

<p>Legal experts say this judgment will serve as the foundation for interpreting and implementing the Digital Personal Data Protection Act across all sectors.</p>`,
      authorSlug: 'priya-sharma',
      categorySlug: 'politics',
      isBreaking: false,
      isFeatured: false,
      sources: [
        { name: 'Supreme Court of India', url: 'https://sci.gov.in', sourceType: 'COURT_DOCUMENT' },
      ],
    },
    {
      title: 'Indian AI Startup Raises $200M in Series C, Becomes Latest Unicorn',
      slug: 'indian-ai-startup-raises-200m-series-c-unicorn',
      excerpt: 'A Bengaluru-based AI startup has raised $200 million in Series C funding led by global investors, reaching a valuation of $1.2 billion.',
      content: `<p>Bengaluru-based artificial intelligence startup NeuralTech AI has raised $200 million in its Series C funding round, achieving unicorn status with a valuation of $1.2 billion.</p>

<p>The funding round was led by Sequoia Capital and Tiger Global, with participation from existing investors Accel Partners and Matrix Partners India.</p>

<h2>About NeuralTech AI</h2>

<p>Founded in 2021, NeuralTech AI has developed a proprietary large language model specifically trained for Indian languages and enterprise use cases. The platform serves over 500 enterprise clients across banking, healthcare, and government sectors.</p>

<h2>Growth and Expansion Plans</h2>

<p>The company plans to use the new funding for:</p>
<ul>
<li>Expanding its AI research team with 200 new hires</li>
<li>Building a state-of-the-art GPU cluster for model training</li>
<li>Entering Southeast Asian markets</li>
<li>Developing industry-specific AI solutions</li>
</ul>

<p>CEO Arun Krishnamurthy stated that the company is on track to achieve $100 million in annual recurring revenue by the end of this fiscal year.</p>`,
      authorSlug: 'rohit-gupta',
      categorySlug: 'technology',
      isBreaking: false,
      isFeatured: false,
      sources: [
        { name: 'Company Press Release', url: 'https://example.com', sourceType: 'OFFICIAL_STATEMENT' },
        { name: 'Original Reporting', url: '', sourceType: 'ORIGINAL_REPORTING' },
      ],
    },
    {
      title: 'Sensex Hits All-Time High Crossing 85,000 Mark Amid Strong FII Inflows',
      slug: 'sensex-all-time-high-85000-fii-inflows',
      excerpt: 'The BSE Sensex surged past the 85,000 mark for the first time, driven by robust foreign institutional investor inflows and strong corporate earnings.',
      content: `<p>The BSE Sensex crossed the historic 85,000 mark for the first time, registering a gain of over 500 points in intraday trading. The rally was driven by strong foreign institutional investor (FII) inflows and better-than-expected corporate earnings.</p>

<h2>Market Performance</h2>

<p>Key indices showed strong performance across sectors:</p>
<ul>
<li>Sensex: 85,127.45 (+512.30, +0.61%)</li>
<li>Nifty 50: 25,847.20 (+158.75, +0.62%)</li>
<li>Bank Nifty: 55,230.50 (+345.80, +0.63%)</li>
</ul>

<h2>Driving Factors</h2>

<p>Market analysts attributed the rally to several factors including strong Q2 earnings from IT and banking sectors, continued domestic institutional investment, and positive global cues from US Federal Reserve's dovish stance on interest rates.</p>

<p>FIIs have invested over Rs 15,000 crore in Indian equities this month, reflecting growing confidence in India's economic growth story.</p>`,
      authorSlug: 'ananya-reddy',
      categorySlug: 'business',
      isBreaking: true,
      isFeatured: false,
      sources: [
        { name: 'BSE India', url: 'https://bseindia.com', sourceType: 'OFFICIAL_STATEMENT' },
        { name: 'NSE India', url: 'https://nseindia.com', sourceType: 'OFFICIAL_STATEMENT' },
      ],
    },
    {
      title: 'India Wins Test Series Against Australia in Historic Comeback',
      slug: 'india-wins-test-series-australia-historic-comeback',
      excerpt: 'Team India clinched the Test series against Australia 3-2 with a dramatic victory in the final Test, marking one of the greatest comebacks in cricket history.',
      content: `<p>In what will be remembered as one of the greatest comebacks in cricket history, Team India clinched the Test series against Australia 3-2 with a thrilling victory in the decisive fifth Test at the Gabba.</p>

<h2>Match Summary</h2>

<p>Chasing a target of 328 runs on the final day, India reached 329/7 with just 18 balls to spare. The victory was anchored by a magnificent century from the young batting sensation who remained unbeaten on 152.</p>

<h2>Series Highlights</h2>
<ul>
<li>India lost the first Test by 8 wickets</li>
<li>Won the second Test by 8 wickets</li>
<li>Third Test ended in a draw</li>
<li>Australia won the fourth Test by 3 wickets</li>
<li>India won the decider in dramatic fashion</li>
</ul>

<p>The BCCI congratulated the team for showing extraordinary resilience and determination throughout the series.</p>`,
      authorSlug: 'priya-sharma',
      categorySlug: 'sports',
      isBreaking: false,
      isFeatured: false,
      sources: [
        { name: 'BCCI Official', url: 'https://bcci.tv', sourceType: 'OFFICIAL_STATEMENT' },
        { name: 'Original Reporting', url: '', sourceType: 'ORIGINAL_REPORTING' },
      ],
    },
    {
      title: 'G20 Nations Agree on Global AI Governance Framework at Delhi Summit',
      slug: 'g20-global-ai-governance-framework-delhi-summit',
      excerpt: 'G20 leaders at the Delhi summit have reached consensus on a comprehensive framework for governing artificial intelligence, balancing innovation with safety.',
      content: `<p>In a historic development, G20 nations have agreed on a comprehensive framework for governing artificial intelligence, marking the first major international consensus on AI regulation.</p>

<p>The agreement, reached during the Delhi summit, establishes principles for responsible AI development while ensuring that innovation continues to drive economic growth.</p>

<h2>Key Framework Elements</h2>

<ul>
<li>Mandatory risk assessments for high-impact AI systems</li>
<li>Transparency requirements for AI decision-making in critical sectors</li>
<li>International cooperation on AI safety research</li>
<li>Support for developing nations in building AI capabilities</li>
<li>Protection of human rights in the context of AI deployment</li>
</ul>

<h2>India's Leadership Role</h2>

<p>As the G20 presidency holder, India played a crucial role in bridging differences between technology-leading nations and emerging economies. The framework reflects India's emphasis on inclusive and responsible AI development.</p>

<p>Prime Minister emphasized that the framework represents a "new chapter in global digital governance" and demonstrates the world's ability to come together on emerging technology challenges.</p>`,
      authorSlug: 'priya-sharma',
      categorySlug: 'world',
      isBreaking: false,
      isFeatured: false,
      sources: [
        { name: 'G20 Official Communique', url: 'https://g20.org', sourceType: 'OFFICIAL_STATEMENT' },
        { name: 'Press Conference', url: '', sourceType: 'PRESS_CONFERENCE' },
      ],
    },
  ];

  for (const articleData of articlesData) {
    const { sources, authorSlug, categorySlug, ...rest } = articleData;

    const existingArticle = await prisma.article.findUnique({
      where: { slug: rest.slug },
    });

    if (!existingArticle) {
      const article = await prisma.article.create({
        data: {
          ...rest,
          authorId: authors[authorSlug].id,
          categoryId: categories[categorySlug].id,
          status: 'PUBLISHED',
          publishedAt: new Date(),
          sources: {
            create: sources,
          },
        },
      });
      console.log(`✅ Article created: "${article.title.substring(0, 50)}..."`);
    } else {
      console.log(`⏭️  Article already exists: "${rest.title.substring(0, 50)}..."`);
    }
  }

  // ============================================
  // 5. Create Sample Tags
  // ============================================
  const tagsData = [
    { name: 'Breaking News', slug: 'breaking-news' },
    { name: 'Economy', slug: 'economy' },
    { name: 'Cricket', slug: 'cricket' },
    { name: 'AI', slug: 'ai' },
    { name: 'Climate', slug: 'climate' },
    { name: 'Startups', slug: 'startups' },
    { name: 'Elections', slug: 'elections' },
    { name: 'Markets', slug: 'markets' },
  ];

  for (const tag of tagsData) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
  console.log('✅ Tags created');

  console.log('\n🎉 Seeding complete!');
  console.log('📧 Admin login: admin@newshub.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
