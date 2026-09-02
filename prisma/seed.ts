import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with latest news...\n');

  // 1. Create Admin User
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.hash('admin123', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@theworldnews.app' },
    update: {},
    create: {
      email: 'admin@theworldnews.app',
      passwordHash: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });
  console.log('Admin user created:', adminUser.email);

  // 2. Create Categories
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
  console.log('Categories created:', Object.keys(categories).join(', '));

  // 3. Create Authors
  const authorsData = [
    { name: 'Priya Sharma', slug: 'priya-sharma', bio: 'Senior political correspondent covering Indian politics and governance.', status: 'ACTIVE' },
    { name: 'Rohit Gupta', slug: 'rohit-gupta', bio: 'Technology editor specializing in startups, AI, and digital innovation.', status: 'ACTIVE' },
    { name: 'Ananya Reddy', slug: 'ananya-reddy', bio: 'Business journalist covering markets, economy, and corporate news.', status: 'ACTIVE' },
    { name: 'Vikram Singh', slug: 'vikram-singh', bio: 'International affairs correspondent covering global conflicts and diplomacy.', status: 'ACTIVE' },
    { name: 'Meera Joshi', slug: 'meera-joshi', bio: 'Sports editor with expertise in cricket, tennis, and Olympic sports.', status: 'ACTIVE' },
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
  console.log('Authors created:', Object.keys(authors).join(', '));

  // 4. Create Articles — REAL BREAKING NEWS (September 2026)
  const articlesData = [
    // ===== BREAKING / FEATURED =====
    {
      title: 'Nepal Floods: Death Toll Crosses 939, Over 4,200 Still Missing After Glacial Collapse',
      slug: 'nepal-floods-death-toll-939-glacial-collapse',
      excerpt: 'A catastrophic glacial collapse along the Nepal-Tibet border has triggered devastating floods, killing at least 939 people. International rescue teams from India, China, and Australia join massive search operations.',
      content: `<p>The death toll from the catastrophic floods in Nepal has risen to 939, with over 4,200 people still missing, including nearly 600 foreign nationals. The disaster, triggered by a massive glacial collapse along the Nepal-Tibet border, has become one of the worst natural calamities in the Himalayan region in decades.</p>

<h2>Rescue Operations Underway</h2>
<p>International rescue teams from India, China, South Korea, and Australia have joined Nepali forces in a massive search-and-rescue operation. Hundreds of workers are feared trapped in mud-filled hydropower tunnels along the Bhote Koshi river valley.</p>

<p>The Indian Army has deployed its NDRF teams and helicopters for evacuation efforts. Multiple makeshift camps have been set up to shelter thousands of displaced families.</p>

<h2>Climate Change Connection</h2>
<p>UN climate experts have highlighted this disaster as a stark indicator of the vulnerability of the Hindu Kush Himalayas to climate change. The region is warming significantly faster than the global average, accelerating glacial melting and increasing the risk of glacial lake outburst floods (GLOFs).</p>

<p>Nepal's Prime Minister has declared a national emergency and appealed for international aid, estimating damages could exceed $2 billion. The tragedy has reignited global debate on climate adaptation funding for vulnerable nations.</p>`,
      authorSlug: 'vikram-singh',
      categorySlug: 'world',
      isBreaking: true,
      isFeatured: true,
    },
    {
      title: 'India GDP Growth Surges to 7.8%, Fastest Among Major Economies',
      slug: 'india-gdp-growth-7-8-percent-fastest',
      excerpt: 'India records robust GDP growth of 7.8% in Q1 FY27, maintaining its position as the fastest-growing major economy in the world.',
      content: `<p>India's economy grew at an impressive 7.8% in the April-June quarter of FY2026-27, reaffirming its status as the world's fastest-growing major economy. The data, released by the Ministry of Statistics, exceeded market expectations of 7.2%.</p>

<h2>Growth Drivers</h2>
<p>The strong performance was driven by robust manufacturing output, a revival in private consumption, and continued government capital expenditure. The services sector, which accounts for over 55% of GDP, grew at 8.2%.</p>

<p>Agriculture growth remained moderate at 3.5%, while the construction sector posted a healthy 9.1% expansion supported by large infrastructure projects under the PM Gati Shakti initiative.</p>

<h2>Global Context</h2>
<p>India's growth stands out at a time when China's economy is growing at 4.7% and several Western economies face recessionary pressures. International agencies including the IMF and World Bank have projected India to maintain over 7% growth through FY27.</p>

<p>Finance Minister stated that the government's focus on infrastructure spending, digital public goods, and manufacturing incentives through the PLI scheme are delivering results.</p>`,
      authorSlug: 'ananya-reddy',
      categorySlug: 'business',
      isBreaking: true,
      isFeatured: false,
    },
    {
      title: 'US-Iran Tensions Escalate: US Strikes IRGC Launchers, Iran Retaliates with Missiles',
      slug: 'us-iran-tensions-escalate-strait-of-hormuz',
      excerpt: 'Tensions flare in the Strait of Hormuz as US forces strike Iranian IRGC rocket launchers, prompting retaliatory ballistic missile launch at US forces in Jordan.',
      content: `<p>Military tensions between the United States and Iran have escalated dramatically after US forces struck Iranian Islamic Revolutionary Guard Corps (IRGC) rocket launchers near the Strait of Hormuz. Iran retaliated with a ballistic missile launch targeting US forces stationed in Jordan.</p>

<h2>The Strikes</h2>
<p>The US strike was carried out using precision-guided munitions targeting IRGC mobile rocket launcher positions that US intelligence assessed were preparing for attacks on commercial shipping lanes. The Pentagon confirmed the operation was "defensive and proportionate."</p>

<p>Iran responded within hours by launching several ballistic missiles at a US military installation in Jordan. Reports indicate that most missiles were intercepted by US air defense systems with no significant casualties.</p>

<h2>International Response</h2>
<p>Global oil prices surged 8% following the exchange, with Brent crude crossing $95 per barrel. The UN Security Council held an emergency session, with the Secretary-General calling for "immediate de-escalation."</p>

<p>India, which depends on the Strait of Hormuz for a significant portion of its oil imports, has called for restraint from both sides and offered to mediate through diplomatic channels.</p>`,
      authorSlug: 'vikram-singh',
      categorySlug: 'world',
      isBreaking: true,
      isFeatured: false,
    },
    {
      title: 'Supreme Court Allows CJP Protest March on Exam Irregularities, Rejects Government Plea',
      slug: 'supreme-court-allows-cjp-protest-march-exam-irregularities',
      excerpt: 'The Supreme Court declined a plea to ban the Cockroach Janta Party protest march scheduled for September 5, upholding the right to peaceful demonstration over examination irregularities.',
      content: `<p>In a significant ruling on democratic rights, the Supreme Court of India has declined the government's plea to prohibit a scheduled protest march by the Cockroach Janta Party (CJP) regarding widespread examination irregularities. The protest is planned for September 5 in New Delhi.</p>

<h2>Court's Observations</h2>
<p>A bench headed by the Chief Justice of India observed that the right to peaceful protest is a fundamental right enshrined in Article 19 of the Constitution. The court noted that concerns about examination integrity are "matters of serious public interest."</p>

<p>"Citizens have every right to express their grievances through peaceful means. The government cannot seek to silence legitimate democratic expression," the bench stated in its order.</p>

<h2>Background</h2>
<p>The CJP has been demanding accountability over allegations of paper leaks and irregularities in multiple competitive examinations. Students across several states have reported losing years of preparation due to repeated exam cancellations and re-examinations.</p>

<p>The government had argued that the protest could cause law and order issues, but the court directed the Delhi Police to ensure adequate security arrangements for the march while maintaining public order.</p>`,
      authorSlug: 'priya-sharma',
      categorySlug: 'politics',
      isBreaking: true,
      isFeatured: false,
    },
    {
      title: 'PM Modi Holds Bilateral Talks with Iran President at SCO Summit in Kyrgyzstan',
      slug: 'pm-modi-bilateral-talks-iran-sco-summit-kyrgyzstan',
      excerpt: 'Prime Minister Modi meets Iranian President on the sidelines of the SCO summit, discussing bilateral ties, energy cooperation, and regional stability.',
      content: `<p>Prime Minister Narendra Modi held bilateral discussions with the President of Iran on the sidelines of the Shanghai Cooperation Organisation (SCO) summit in Kyrgyzstan. The leaders discussed bilateral relations, energy cooperation, the Chabahar port project, and regional stability.</p>

<h2>Key Discussion Points</h2>
<p>The talks focused on strengthening India-Iran economic ties, particularly in the energy sector. India is keen on securing long-term oil supply agreements amid volatile global energy markets.</p>

<p>The Chabahar port, India's strategic gateway to Afghanistan and Central Asia, was a major agenda item. Both leaders reviewed the progress of port development and agreed to expedite the operationalization of additional terminals.</p>

<h2>SCO Summit Context</h2>
<p>The SCO summit has brought together leaders from China, Russia, India, Pakistan, and Central Asian nations. Counter-terrorism cooperation, trade facilitation, and connectivity projects dominated the multilateral discussions.</p>

<p>PM Modi also held separate bilaterals with the Presidents of Uzbekistan and Kyrgyzstan, discussing uranium supplies and trade expansion respectively.</p>`,
      authorSlug: 'priya-sharma',
      categorySlug: 'politics',
      isBreaking: false,
      isFeatured: false,
    },
    {
      title: 'Russia Escalates Air Campaign: Six Consecutive Days of Drone Strikes on Kyiv',
      slug: 'russia-escalates-air-campaign-drone-strikes-kyiv',
      excerpt: 'Russia deploys new jet-powered drones in six consecutive days of strikes on Kyiv, targeting residential areas and railway infrastructure.',
      content: `<p>Russia has escalated its air campaign against Ukraine with six consecutive days of intensive strikes on the capital Kyiv. The attacks have featured new versions of jet-powered drones that Ukrainian defense officials say are proving difficult to intercept.</p>

<h2>New Drone Technology</h2>
<p>Military analysts have identified the new drones as an evolution of the Shahed-series, now equipped with jet propulsion systems that make them significantly faster and harder to detect. The drones have been deployed in swarm formations, overwhelming air defense systems.</p>

<p>Ukrainian air defense forces reported intercepting approximately 60% of the incoming drones, but the remainder caused significant damage to residential buildings, power infrastructure, and railway stations.</p>

<h2>Humanitarian Impact</h2>
<p>The sustained air campaign has killed at least 47 civilians and injured over 200 in the past week alone. Hundreds of thousands have been left without electricity as power distribution stations were targeted.</p>

<p>President Zelensky renewed his appeal for advanced Western air defense systems, stating that the evolving drone threat requires "next-generation interceptors" that can handle jet-powered UAVs.</p>`,
      authorSlug: 'vikram-singh',
      categorySlug: 'world',
      isBreaking: true,
      isFeatured: false,
    },
    {
      title: 'Government Notifies Rs 1.27 Lakh Crore Semicon 2.0 Scheme for Chip Ecosystem',
      slug: 'government-notifies-semicon-2-scheme-chip-ecosystem',
      excerpt: 'The government unveils the Semicon 2.0 scheme with Rs 1,27,500 crore outlay, detailing eligibility norms and incentives for semiconductor manufacturing in India.',
      content: `<p>The Indian government has officially notified the Semicon 2.0 scheme with an allocation of Rs 1,27,500 crore, aimed at building a robust semiconductor ecosystem in the country. The scheme outlines detailed eligibility norms and incentive structures for companies investing in chip manufacturing, design, and packaging.</p>

<h2>Scheme Details</h2>
<p>Under Semicon 2.0, the government will provide up to 50% of capital expenditure support for greenfield semiconductor fabrication plants. Companies setting up compound semiconductor, silicon photonics, and sensor fabrication facilities will receive enhanced incentives.</p>

<p>The scheme also includes provisions for design-linked incentives covering up to 50% of design costs for Indian semiconductor design companies, and specialized support for OSAT (outsourced assembly and test) facilities.</p>

<h2>Industry Impact</h2>
<p>The notification comes at a time when global semiconductor supply chains are being restructured. India is positioning itself as an alternative manufacturing hub alongside Taiwan, South Korea, and the United States.</p>

<p>Industry bodies including NASSCOM have welcomed the scheme, projecting that it could help India capture 10% of the global semiconductor market by 2035, creating over 1 million direct and indirect jobs.</p>`,
      authorSlug: 'ananya-reddy',
      categorySlug: 'india',
      isBreaking: true,
      isFeatured: false,
    },
    {
      title: 'Delhi Draft Electoral Roll Released: 47.7 Lakh Names Excluded',
      slug: 'delhi-draft-electoral-roll-47-lakh-names-excluded',
      excerpt: 'The Election Commission releases Delhi draft electoral roll with the removal of 47.7 lakh names, sparking political controversy ahead of upcoming elections.',
      content: `<p>The Election Commission of India has released the draft electoral roll for Delhi, revealing that 47.7 lakh voter names have been excluded from the previous list. The significant reduction has sparked a political firestorm, with opposition parties alleging systematic disenfranchisement.</p>

<h2>Reasons for Exclusion</h2>
<p>The Election Commission stated that the name removals are a result of a comprehensive revision process that includes removing duplicate entries, deceased voters, and individuals who have shifted residence. The Aadhaar-voter ID linking exercise has also led to the identification and removal of multiple registrations.</p>

<p>The commission has emphasized that the draft roll is open for public claims and objections until October 15, and eligible voters whose names were erroneously removed can apply for re-inclusion.</p>

<h2>Political Reactions</h2>
<p>The ruling party at the Center has defended the revision as a necessary exercise for electoral purity, while Delhi's opposition parties have called it "electoral engineering." A PIL has been filed in the Delhi High Court seeking judicial oversight of the revision process.</p>

<p>With Delhi Assembly elections expected in early 2027, the electoral roll controversy has added a new dimension to the already heated political landscape in the national capital.</p>`,
      authorSlug: 'priya-sharma',
      categorySlug: 'india',
      isBreaking: false,
      isFeatured: false,
    },
    {
      title: 'Djokovic Stunned in US Open First Round by Navone in Major Upset',
      slug: 'djokovic-stunned-us-open-first-round-navone',
      excerpt: 'Novak Djokovic suffers a shock first-round exit at the 2026 US Open, falling to Argentine qualifier Navone in a five-set thriller.',
      content: `<p>In one of the biggest upsets in Grand Slam history, 24-time major champion Novak Djokovic was eliminated in the first round of the 2026 US Open by Argentine player Navone. The match, lasting over four hours, ended in a five-set thriller that left the Arthur Ashe crowd stunned.</p>

<h2>Match Summary</h2>
<p>Navone, ranked 78th in the world, played the match of his life, combining aggressive baseline play with exceptional net approaches. Djokovic, visibly struggling with his movement in the later sets, could not convert multiple break point opportunities in the deciding set.</p>

<p>The final scoreline read 6-4, 3-6, 7-6(5), 4-6, 6-3 in favor of the 23-year-old Argentine, who collapsed to the court in disbelief after match point.</p>

<h2>Implications</h2>
<p>At 39, questions about Djokovic's ability to compete at the highest level are growing louder. This marks his earliest Grand Slam exit since the 2017 Australian Open. Tennis pundits are debating whether the Serbian legend's extraordinary career may be approaching its twilight.</p>

<p>Navone, meanwhile, will face the 28th seed in the second round as he looks to build on this career-defining victory.</p>`,
      authorSlug: 'meera-joshi',
      categorySlug: 'sports',
      isBreaking: true,
      isFeatured: false,
    },
    {
      title: 'England Crush Pakistan by 194 Runs to Win Test Series at Lord\'s',
      slug: 'england-crush-pakistan-194-runs-test-series-lords',
      excerpt: 'England secure a dominant 194-run victory over Pakistan at Lord\'s to clinch the Test series, with standout performances from the bowling attack.',
      content: `<p>England completed a comprehensive 194-run victory over Pakistan at Lord's Cricket Ground to seal the Test series. The hosts dominated all five days of the match, with their bowling attack proving too potent for Pakistan's fragile batting lineup.</p>

<h2>Match Highlights</h2>
<p>After setting Pakistan a target of 378, England's bowlers delivered a clinical performance. The new ball pair shared seven wickets between them as Pakistan were bowled out for 183 in their second innings.</p>

<p>England's first innings total of 465 was built around a magnificent century from the middle order, supported by aggressive contributions throughout the lineup. Pakistan's bowlers toiled without reward on a pitch that offered consistent bounce.</p>

<h2>Series Impact</h2>
<p>The victory extends England's strong home record and raises further questions about Pakistan's red-ball cricket setup. Pakistan's captain acknowledged the need for "fundamental changes" in their approach to overseas Test cricket.</p>

<p>The next Test series for both teams begins later this month, with England traveling to New Zealand and Pakistan hosting the West Indies.</p>`,
      authorSlug: 'meera-joshi',
      categorySlug: 'sports',
      isBreaking: false,
      isFeatured: false,
    },
    {
      title: 'Deepti Sharma\'s Record-Breaking Spell Powers India to 94-Run Win in Women\'s Asia Cup',
      slug: 'deepti-sharma-record-spell-india-womens-asia-cup',
      excerpt: 'Deepti Sharma delivers a historic bowling performance as India dominate Thailand by 94 runs in the Women\'s Asia Cup.',
      content: `<p>Indian all-rounder Deepti Sharma produced a record-breaking bowling spell to power India to a dominant 94-run victory over Thailand in the Women's Asia Cup. Her figures of 5 wickets for just 12 runs are the best by any Indian bowler in Women's Asia Cup history.</p>

<h2>India's Dominance</h2>
<p>Batting first, India posted a competitive total of 178 in their allotted overs, with contributions from the top and middle order. The batting was anchored by a composed half-century from the opening batter.</p>

<p>In reply, Thailand were completely undone by Deepti's mixture of arm balls, carrom balls, and conventional off-spin. She struck in her very first over and never relented, removing Thailand's top five batters to effectively end the contest.</p>

<h2>Tournament Outlook</h2>
<p>With this victory, India maintain their perfect record in the tournament and are on track for a semi-final berth. The team's bowling depth has been a standout feature, with both pace and spin options firing on all cylinders.</p>

<p>India next face Sri Lanka in what could be a tournament-defining encounter.</p>`,
      authorSlug: 'meera-joshi',
      categorySlug: 'sports',
      isBreaking: false,
      isFeatured: false,
    },
    {
      title: 'Ebola Outbreak in Congo Surpasses 6,000 Cases, WHO Declares Global Health Emergency',
      slug: 'ebola-outbreak-congo-6000-cases-who-emergency',
      excerpt: 'The ongoing Ebola outbreak in the Democratic Republic of Congo has exceeded 6,000 confirmed cases, prompting WHO to escalate its emergency response.',
      content: `<p>The World Health Organization has escalated its emergency response as the Ebola outbreak in the Democratic Republic of Congo has surpassed 6,000 confirmed cases. The outbreak, which began in early 2026, has become the third-largest in history.</p>

<h2>Outbreak Situation</h2>
<p>The DRC's eastern provinces remain the epicenter of the outbreak, with the virus spreading through densely populated areas where healthcare infrastructure is limited. The case fatality rate stands at approximately 55%, with over 3,300 deaths recorded.</p>

<p>Health workers are facing challenges in contact tracing due to ongoing armed conflict in the region, which has displaced over 2 million people and created conditions conducive to disease transmission.</p>

<h2>International Response</h2>
<p>The WHO has deployed over 500 international health workers and scaled up vaccine distribution. Two experimental vaccines are being administered on a compassionate use basis, with early data suggesting up to 90% efficacy.</p>

<p>India has contributed $10 million to the WHO's Ebola response fund and dispatched a team of epidemiologists to assist in surveillance and containment efforts.</p>`,
      authorSlug: 'vikram-singh',
      categorySlug: 'world',
      isBreaking: false,
      isFeatured: false,
    },
    {
      title: 'UPI Goes Global: NPCI Partners with Uzbekistan for Cross-Border Payments',
      slug: 'upi-goes-global-npci-uzbekistan-cross-border-payments',
      excerpt: 'NPCI International partners with Uzbekistan enabling Indian travelers to make UPI payments in the Central Asian nation using interoperable UZQR codes.',
      content: `<p>In a landmark expansion of India's digital payments infrastructure, NPCI International Payments Ltd. has signed a partnership agreement with Uzbekistan's National Interbank Processing Centre (NIPC). The agreement enables UPI-based merchant payments in Uzbekistan, allowing Indian travelers to use their UPI apps to scan interoperable UZQR codes.</p>

<h2>How It Works</h2>
<p>Indian travelers visiting Uzbekistan can now open any UPI-enabled app on their smartphone, scan an UZQR code displayed at merchant outlets, and complete the payment instantly. The transaction is processed through an interoperable gateway that converts Indian Rupees to Uzbekistani Som at real-time exchange rates.</p>

<p>This eliminates the need for carrying foreign currency or using expensive international credit cards for everyday purchases.</p>

<h2>UPI's Global Footprint</h2>
<p>With Uzbekistan, UPI is now operational in 12 countries, including Singapore, the UAE, France, Sri Lanka, and Bhutan. The government aims to make UPI available in 20+ countries by 2027.</p>

<p>The partnership was announced on the sidelines of the SCO summit, where PM Modi and the Uzbek President discussed expanding bilateral trade and digital connectivity.</p>`,
      authorSlug: 'ananya-reddy',
      categorySlug: 'business',
      isBreaking: false,
      isFeatured: false,
    },
    {
      title: 'BRICS Summit 2026 Set to Begin in New Delhi on September 5',
      slug: 'brics-summit-2026-new-delhi-september-5',
      excerpt: 'New Delhi prepares to host the BRICS Summit 2026 with expanded membership, focusing on trade reform, de-dollarization, and South-South cooperation.',
      content: `<p>New Delhi is gearing up to host the BRICS Summit 2026, which begins on September 5. The summit, bringing together the expanded BRICS grouping that now includes Egypt, Ethiopia, Iran, Saudi Arabia, and the UAE alongside the original five members, is expected to focus on global trade reform, alternative payment systems, and South-South cooperation.</p>

<h2>Key Agenda Items</h2>
<p>The summit will discuss the progress of the New Development Bank's lending operations, proposals for a BRICS-wide digital payment platform, and collective responses to climate change. A joint declaration on reforming international financial institutions, including the IMF and World Bank, is also expected.</p>

<p>India, as the host, has proposed a special session on AI governance and technology transfer among developing nations.</p>

<h2>Security Arrangements</h2>
<p>Delhi Police have implemented a comprehensive security plan, with over 25,000 personnel deployed across the capital. Several major routes will see traffic diversions during the three-day summit.</p>

<p>The summit is expected to generate significant bilateral activity, with PM Modi scheduled to hold over a dozen meetings with visiting heads of state and government.</p>`,
      authorSlug: 'priya-sharma',
      categorySlug: 'india',
      isBreaking: true,
      isFeatured: false,
    },
    {
      title: 'Oracle Employees on Edge as Anticipated Layoff Email Fails to Arrive',
      slug: 'oracle-employees-layoff-email-uncertainty',
      excerpt: 'Anxiety grips Oracle employees in India and the US as a widely anticipated 6 AM layoff email did not arrive, leaving thousands monitoring internal communications.',
      content: `<p>Thousands of Oracle employees across India and the United States spent an anxious Monday morning refreshing their inboxes after widespread reports that a major round of layoffs would be communicated via a "6 AM email." The email, however, did not arrive at the anticipated time, leaving staff in a state of uncertainty.</p>

<h2>The Rumor and the Wait</h2>
<p>Reports on internal channels and social media platforms had indicated that Oracle was planning significant workforce reductions across multiple business units. Employees in Bengaluru, Hyderabad, and Austin were particularly on edge, with some reporting that their calendar meetings had been mysteriously cancelled.</p>

<p>By mid-afternoon, Oracle had not issued any official communication regarding layoffs, though HR teams in some divisions reportedly held "alignment calls" without providing specifics.</p>

<h2>Industry Context</h2>
<p>The uncertainty at Oracle comes amid a broader wave of tech industry restructuring in 2026. Major companies have been realigning their workforce to prioritize AI-related roles while reducing headcount in legacy cloud and enterprise divisions.</p>

<p>Industry analysts estimate that the global tech sector has shed over 150,000 jobs in the first eight months of 2026, though hiring in AI, cybersecurity, and semiconductor design has partially offset the losses.</p>`,
      authorSlug: 'rohit-gupta',
      categorySlug: 'technology',
      isBreaking: false,
      isFeatured: false,
    },
    {
      title: 'Nasscom DES 2026 Kicks Off in Bengaluru: Focus on AI and Future of Engineering',
      slug: 'nasscom-des-2026-bengaluru-ai-engineering',
      excerpt: 'The Nasscom Design and Engineering Summit 2026 opens in Bengaluru with the theme "The World Under Construction," spotlighting AI breakthroughs and industry transformation.',
      content: `<p>The Nasscom Design and Engineering Summit (DES) 2026 has opened in Bengaluru with the theme "The World Under Construction." The two-day event brings together over 3,000 technology leaders, engineers, and innovators to discuss the future of product engineering, AI-driven design, and India's role in global R&D.</p>

<h2>Key Themes</h2>
<p>The summit's opening keynote highlighted how AI is reshaping engineering workflows. Over 60% of news organizations are now experimenting with AI tools for automated reporting and real-time data analytics, according to a report released at the event.</p>

<p>Sessions cover topics ranging from generative AI in product development, digital twins for smart cities, sustainable engineering practices, and India's growing importance as a global engineering hub.</p>

<h2>Industry Announcements</h2>
<p>Several major announcements are expected during the summit, including new R&D center launches and AI-focused partnerships. India's engineering services exports are projected to cross $60 billion by 2027, making the country the second-largest exporter of engineering services globally.</p>

<p>The summit also features a startup showcase, with 50 selected deep-tech startups presenting innovations in areas including quantum computing, advanced materials, and autonomous systems.</p>`,
      authorSlug: 'rohit-gupta',
      categorySlug: 'technology',
      isBreaking: false,
      isFeatured: false,
    },
    {
      title: 'Shimla-Kalka Toy Train Stranded: Hill Slip Traps Over 400 Passengers',
      slug: 'shimla-kalka-toy-train-stranded-hill-slip-400-passengers',
      excerpt: 'The iconic UNESCO heritage Shimla-Kalka toy train service disrupted after a major hill slip near Barog, stranding over 400 passengers for several hours.',
      content: `<p>Over 400 passengers were stranded for several hours after a major hill slip disrupted the iconic Shimla-Kalka toy train service near the Barog tunnel in Himachal Pradesh. The landslide, triggered by heavy monsoon rainfall, deposited tons of debris across the narrow-gauge tracks.</p>

<h2>Rescue and Recovery</h2>
<p>Railway authorities deployed emergency rescue teams and earth-moving equipment to clear the tracks. Passengers, including families with young children and elderly travelers, were provided with food and water while waiting for the debris to be cleared.</p>

<p>Some passengers were evacuated by road using buses arranged by the district administration. The rail service was partially restored after approximately 8 hours, though operations continued at reduced speed through the affected section.</p>

<h2>Monsoon Impact</h2>
<p>The UNESCO World Heritage railway line, built in 1903, runs through 102 tunnels and over 800 bridges across the Himalayan foothills. It is particularly vulnerable to landslides during the monsoon season.</p>

<p>Himachal Pradesh has recorded 40% above-normal rainfall this monsoon, leading to multiple incidents of landslides and road closures across the state. The state government has issued advisories for travelers.</p>`,
      authorSlug: 'priya-sharma',
      categorySlug: 'india',
      isBreaking: false,
      isFeatured: false,
    },
    {
      title: 'IPO Market Buzzing: Seven New Issues Set to Raise Over Rs 1,400 Crore This Week',
      slug: 'ipo-market-seven-new-issues-1400-crore',
      excerpt: 'The Indian IPO market remains red-hot as seven companies prepare to launch their public offerings this week, aiming to collectively raise over Rs 1,400 crore.',
      content: `<p>The Indian primary market continues its bull run with seven new initial public offerings (IPOs) set to open this week, aiming to collectively raise over Rs 1,400 crore. The strong pipeline reflects sustained investor appetite despite global uncertainties.</p>

<h2>Key IPOs This Week</h2>
<p>The offerings span sectors including fintech, healthcare, renewable energy, and consumer goods. Market analysts expect strong subscription numbers given the robust listing performance of recent IPOs, with an average listing-day gain of 25% in 2026.</p>

<p>Retail investors are expected to drive significant demand, supported by the ease of UPI-based IPO applications through platforms like Zerodha, Groww, and Paytm Money.</p>

<h2>Market Outlook</h2>
<p>India's IPO market has raised over Rs 75,000 crore in the first eight months of 2026, already surpassing the full-year total for 2025. SEBI's streamlined listing framework and strong secondary market conditions have encouraged companies to go public.</p>

<p>However, market regulators have cautioned investors about the risks of investing in IPOs solely for listing gains, urging fundamental analysis of business models and valuations.</p>`,
      authorSlug: 'ananya-reddy',
      categorySlug: 'business',
      isBreaking: false,
      isFeatured: false,
    },
  ];

  for (const article of articlesData) {
    const existing = await prisma.article.findUnique({ where: { slug: article.slug } });
    if (!existing) {
      await prisma.article.create({
        data: {
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          authorId: authors[article.authorSlug].id,
          categoryId: categories[article.categorySlug].id,
          status: 'PUBLISHED',
          isBreaking: article.isBreaking,
          isFeatured: article.isFeatured,
          publishedAt: new Date(),
          language: 'en',
        },
      });
      console.log(`Article created: ${article.title.substring(0, 60)}...`);
    }
  }

  console.log('\nSeeding complete!');
  console.log('Admin login: admin@theworldnews.app / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
