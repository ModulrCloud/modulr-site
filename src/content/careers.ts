export type CareerPost = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  level: string;
  salary?: string;
  excerpt: string;
  posted: string;
};

export const careerDepartments = [
  "All",
  "Engineering",
  "Robotics",
  "Design",
  "Marketing",
  "Operations",
] as const;

export const careerPosts: CareerPost[] = [
  /*{
    slug: "senior-rust-engineer",
    title: "Senior Rust Engineer",
    department: "Engineering",
    location: "Remote (US/EU)",
    type: "Full-time",
    level: "Senior",
    salary: "$150k – $200k",
    excerpt:
      "Build core blockchain infrastructure for the Modulr Network. You'll design high-performance systems for real-time robotic teleoperation using Rust.",
    posted: "Jan 15, 2026",
  },*/
  {
    slug: "robotics-systems-engineer",
    title: "Robotics Systems Engineer",
    department: "Robotics",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$110k – $150k",
    excerpt:
      "Design and integrate robotic hardware and software systems. Work with ROS2, embedded systems, and real-time control architectures.",
    posted: "Jan 12, 2026",
  },
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    salary: "$80k – $120k",
    excerpt:
      "Create beautiful, high-performance user interfaces for our teleoperation dashboard and network explorer using React and Next.js.",
    posted: "Jan 10, 2026",
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$80k – $120k",
    excerpt:
      "Shape the future of human-robot interaction. Design intuitive interfaces for complex robotic control systems and blockchain-native applications.",
    posted: "Jan 8, 2026",
  },
  /* Hidden
  {
    slug: "devrel-engineer",
    title: "Developer Relations Engineer",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Senior",
    excerpt:
      "Build community and help developers succeed on Modulr. Create tutorials, documentation, and engage with the robotics and blockchain communities.",
    posted: "Jan 5, 2026",
  },
  {
    slug: "embedded-systems-engineer",
    title: "Embedded Systems Engineer",
    department: "Robotics",
    location: "Austin, TX",
    type: "Full-time",
    level: "Senior",
    salary: "$140k – $180k",
    excerpt:
      "Develop low-latency firmware for robotic controllers and edge devices. Experience with ARM, FPGA, and real-time operating systems required.",
    posted: "Jan 3, 2026",
  },
  */
  /*{
    slug: "blockchain-engineer",
    title: "Blockchain Protocol Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    salary: "$120k – $140k",
    excerpt:
      "Design and implement consensus mechanisms, smart contract VMs, and cryptographic primitives for the Modulr Network.",
    posted: "Dec 28, 2025",
  },*/
  {
    slug: "operations-manager",
    title: "Operations Manager",
    department: "Operations",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    excerpt:
      "Scale our operations as we grow. Manage vendor relationships, coordinate cross-functional projects, and optimize internal processes.",
    posted: "Dec 20, 2025",
  },
];



