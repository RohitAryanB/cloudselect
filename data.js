// ── PROVIDER UI DATA ──

const PROVIDERS = {
  aws:{
    label:'AWS',
    color:'#fff3e0',
    textColor:'#ff9900',
    symbol:'AWS',
    logo:'AWS'
},

  azure:{
    label:'Azure',
    color:'#e3f2fd',
    textColor:'#0078d4',
    symbol:'AZ',
    logo:'AZ'
},

  gcp:{
    label:'GCP',
    color:'#fce4ec',
    textColor:'#4285f4',
    symbol:'GCP',
    logo:'GCP'
},

  oracle:{
    label:'Oracle',
    color:'#fff0f0',
    textColor:'#f80000',
    symbol:'OCI',
    logo:'OCI'
},

  ibm:{
    label:'IBM',
    color:'#e8f4ff',
    textColor:'#0f62fe',
    symbol:'IBM',
    logo:'IBM'
},

  sify:{
    label:'Sify',
    color:'#e8f2fb',
    textColor:'#1b75bc',
    symbol:'SIFY',
    logo:'SIFY'
},

  yotta:{
    label:'Yotta',
    color:'#fdecee',
    textColor:'#e63946',
    symbol:'YOT',
    logo:'YOT'
},

  tata:{
    label:'Tata IZO',
    color:'#e9edf9',
    textColor:'#1c3f94',
    symbol:'IZO',
    logo:'IZO'
},

  nxtra:{
    label:'Nxtra',
    color:'#fdeced',
    textColor:'#ed1c24',
    symbol:'NXT',
    logo:'NXT'
}

};



// ── COMPLETE CLOUD DATABASE ──

const cloudProviders = {

aws: {
    name:"Amazon Web Services",
    rating:"4.7/5",
    trial:"Active Free Trial",
    price:{
    starting:"$5/mo",
    estimated:"$1500/mo",
    calculator:"https://calculator.aws"
},
    
    description:
    "AWS provides scalable cloud infrastructure with compute, storage, AI and enterprise solutions.",

    freeOffer:[
        "12 Months Free Tier",
        "750 hours t2.micro"
    ],

    primaryWorkloads:[
        "Host a Website",
        "Build a Web Application",
        "Mobile App Backend",
        "AI / Machine Learning",
        "Database Hosting",
        "Data Analytics",
        "Containers & Kubernetes",
        "Serverless Applications",
        "Storage & Backup",
        "DevOps & CI/CD",
        "IoT Solutions",
        "Game Hosting"
    ],

    popularServices:[
        "EC2",
        "S3",
        "Lambda",
        "RDS",
        "EKS"
    ]
},


azure:{
    name:"Microsoft Azure",
    rating:"4.7/5",
    trial:"Active Free Trial",
    price:{
    starting:"$5/mo",
    estimated:"$1500/mo",
    calculator:"https://azure.microsoft.com/en-in/pricing/calculator/"
},

    description:
    "Microsoft Azure delivers enterprise cloud solutions with strong integration across Microsoft services.",

    freeOffer:[
        "$200 Credit for 30 Days",
        "12 Months Popular Services Free"
    ],

    primaryWorkloads:[
        "Host a Website",
        "Build a Web Application",
        "Mobile App Backend",
        "AI / Machine Learning",
        "Database Hosting",
        "Data Analytics",
        "Containers & Kubernetes",
        "Serverless Applications",
        "Storage & Backup",
        "DevOps & CI/CD",
        "IoT Solutions"
    ],

    popularServices:[
        "Virtual Machines",
        "Azure SQL",
        "Azure Functions",
        "AKS"
    ]
},


gcp:{
    name:"Google Cloud Platform",
    rating:"4.7/5",
    trial:"Free Tier Available",
    price:{
    starting:"$5/mo",
    estimated:"$1500/mo",
    calculator:"https://cloud.google.com/products/calculator"
},

    description:
    "Google Cloud focuses on AI, machine learning, analytics and Kubernetes solutions.",

    freeOffer:[
        "$300 Credit for 90 Days",
        "20+ Free Tier Products"
    ],

    primaryWorkloads:[
        "Host a Website",
        "Build a Web Application",
        "AI / Machine Learning",
        "Database Hosting",
        "Data Analytics",
        "Containers & Kubernetes",
        "Serverless Applications",
        "Storage & Backup",
        "DevOps & CI/CD"
    ],

    popularServices:[
        "Compute Engine",
        "BigQuery",
        "Cloud Storage",
        "GKE"
    ]
},


oracle:{
    name:"Oracle Cloud Infrastructure",
    rating:"4.7/5",
    trial:"Free Tier Available",
    price:{
    starting:"$5/mo",
    estimated:"$1500/mo",
    calculator:"https://www.oracle.com/cloud/costestimator.html"
},

    description:
    "Oracle Cloud provides enterprise cloud services with powerful database solutions.",

    freeOffer:[
        "$300 Credit for 90 Days",
        "Always Free Tier"
    ],

    primaryWorkloads:[
        "Host a Website",
        "Build a Web Application",
        "Database Hosting",
        "Data Analytics",
        "Containers & Kubernetes",
        "Storage & Backup",
        "DevOps & CI/CD"
    ],

    popularServices:[
        "Autonomous Database",
        "Compute",
        "Object Storage"
    ]
},


ibm:{
    name:"IBM Cloud",
    rating:"4.2/5",
    trial:"No Free Trial",
    price:{
    starting:"$10/mo",
    estimated:"$800/mo",
    calculator:"https://www.ibm.com/cloud/calculator"
},

    description:
    "IBM Cloud provides AI, hybrid cloud and enterprise security solutions.",

    freeOffer:[
        "Lite Plan on Select Services"
    ],

    primaryWorkloads:[
        "AI / Machine Learning",
        "Database Hosting",
        "Data Analytics",
        "Containers & Kubernetes",
        "Serverless Applications",
        "DevOps & CI/CD",
        "IoT Solutions"
    ],

    popularServices:[
        "Watson AI",
        "OpenShift",
        "Cloud Databases"
    ]
},


sify:{
    name:"Sify Cloud",
    rating:"4.1/5",
    trial:"No Free Trial",
    price:{
    starting:"$50/mo",
    estimated:"$2000/mo",
    calculator:"https://www.sifytechnologies.com"
},

    description:
    "Sify Cloud provides managed cloud infrastructure and hybrid cloud solutions.",

    freeOffer:[
        "Enterprise Trial on Request"
    ],

    primaryWorkloads:[
        "Host a Website",
        "Build a Web Application",
        "Mobile App Backend",
        "Database Hosting",
        "Containers & Kubernetes",
        "Storage & Backup",
        "DevOps & CI/CD"
    ],

    popularServices:[
        "Managed Cloud",
        "VMware",
        "Disaster Recovery"
    ]
},


yotta:{
    name:"Yotta Data Services",
    rating:"4.3/5",
    trial:"No Free Trial",
    price:{
    starting:"$100/mo",
    estimated:"$5000/mo",
    calculator:"https://www.yotta.com"
},

    description:
    "Yotta provides GPU cloud infrastructure focused on AI and high performance computing.",

    freeOffer:[
        "GPU Cluster Demo on Request"
    ],

    primaryWorkloads:[
        "AI / Machine Learning",
        "Data Analytics",
        "Database Hosting",
        "Containers & Kubernetes",
        "Storage & Backup"
    ],

    popularServices:[
        "GPU Cloud",
        "AI Infrastructure",
        "Bharat Cloud"
    ]
},


tata:{
    name:"Tata Communications Cloud (IZO)",
    rating:"4.0/5",
    trial:"No Free Trial",
    price:{
    starting:"$50/mo",
    estimated:"$1500/mo",
    calculator:"https://www.tatacommunications.com"
},

    description:
    "Tata IZO provides hybrid cloud, managed hosting and multi-cloud solutions.",

    freeOffer:[
        "Custom Managed Hosting Trial"
    ],

    primaryWorkloads:[
        "Host a Website",
        "Build a Web Application",
        "Mobile App Backend",
        "Database Hosting",
        "Containers & Kubernetes",
        "Storage & Backup",
        "DevOps & CI/CD"
    ],

    popularServices:[
        "IZO Multi Cloud",
        "Managed Hosting",
        "Disaster Recovery"
    ]
},


nxtra:{
    name:"Nxtra Data (Airtel)",
    rating:"4.0/5",
    trial:"No Free Trial",
    price:{
    starting:"$100/mo",
    estimated:"$3000/mo",
    calculator:"https://www.nxtra.in"
},

    description:
    "Nxtra provides edge cloud, infrastructure and enterprise data solutions.",

    freeOffer:[
        "Enterprise Pilot on Request"
    ],

    primaryWorkloads:[
        "Host a Website",
        "Build a Web Application",
        "Database Hosting",
        "Storage & Backup",
        "Containers & Kubernetes",
        "DevOps & CI/CD",
        "IoT Solutions"
    ],

    popularServices:[
        "Edge Cloud",
        "Colocation",
        "Managed Services"
    ]
}

};