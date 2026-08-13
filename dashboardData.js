const DASHBOARD_DATA = {

    /* =========================================================
       AWS
    ========================================================= */

    aws: {
        name: "AWS",
        logo: "aws",
        region: "ap-south-1 (Mumbai)",

        account: {
            id: "1234-5678-9012",
            name: "CloudSelect User"
        },

        overview: {
            totalResources: 156,
            runningResources: 124,
            storageUsed: "3.8 TB",
            monthlyCost: 540,
            health: "Healthy"
        },

        quickActions: [
            {
                label: "Launch EC2 Instance",
                icon: "fa-microchip"
            },
            {
                label: "Create S3 Bucket",
                icon: "fa-database"
            },
            {
                label: "Create RDS Database",
                icon: "fa-server"
            },
            {
                label: "Deploy Website",
                icon: "fa-globe"
            },
            {
                label: "Upload Files",
                icon: "fa-cloud-arrow-up"
            }
        ],

        resourceBreakdown: [
            {
                name: "EC2 Instances",
                count: 45,
                percentage: 29,
                color: "#f59e0b"
            },
            {
                name: "S3 Buckets",
                count: 28,
                percentage: 18,
                color: "#16a34a"
            },
            {
                name: "RDS Databases",
                count: 12,
                percentage: 8,
                color: "#2563eb"
            },
            {
                name: "Lambda Functions",
                count: 35,
                percentage: 22,
                color: "#7c3aed"
            },
            {
                name: "Others",
                count: 36,
                percentage: 23,
                color: "#fbbf24"
            }
        ],

        recentActivity: [
            {
                text: "EC2 instance i-0a1b2c3d4e5 started",
                time: "2 minutes ago",
                icon: "fa-play",
                color: "#16a34a"
            },
            {
                text: "S3 bucket cloudselect-data created",
                time: "1 hour ago",
                icon: "fa-database",
                color: "#16a34a"
            },
            {
                text: "RDS database mydb-instance backup completed",
                time: "3 hours ago",
                icon: "fa-database",
                color: "#2563eb"
            },
            {
                text: "EC2 instance i-0f6g7h8i9j0 stopped",
                time: "5 hours ago",
                icon: "fa-stop",
                color: "#f59e0b"
            },
            {
                text: "Security group sg-0a1b2c3d updated",
                time: "Yesterday",
                icon: "fa-shield-halved",
                color: "#7c3aed"
            }
        ],

        recommendations: [
            {
                title: "Cost Optimization",
                message: "3 unused EC2 instances can be stopped to reduce monthly cost.",
                icon: "fa-money-bill-trend-up",
                color: "#dcfce7"
            },
            {
                title: "Security",
                message: "Enable MFA for all IAM users.",
                icon: "fa-shield-halved",
                color: "#dbeafe"
            }
        ],

        resourceHealth: [
            {
                name: "EC2 Instances",
                count: "45 Instances",
                icon: "fa-microchip"
            },
            {
                name: "S3 Buckets",
                count: "28 Buckets",
                icon: "fa-database"
            },
            {
                name: "RDS Databases",
                count: "12 Databases",
                icon: "fa-database"
            },
            {
                name: "Lambda Functions",
                count: "35 Functions",
                icon: "fa-bolt"
            },
            {
                name: "VPC",
                count: "8 VPCs",
                icon: "fa-network-wired"
            }
        ]
    },


    /* =========================================================
       MICROSOFT AZURE
    ========================================================= */

    azure: {
        name: "Microsoft Azure",
        logo: "azure",
        region: "Central India",

        account: {
            id: "AZ-1234-5678",
            name: "CloudSelect User"
        },

        overview: {
            totalResources: 132,
            runningResources: 110,
            storageUsed: "2.9 TB",
            monthlyCost: 480,
            health: "Healthy"
        },

        quickActions: [
            {
                label: "Create VM",
                icon: "fa-server"
            },
            {
                label: "Create Storage",
                icon: "fa-database"
            },
            {
                label: "Deploy App",
                icon: "fa-globe"
            },
            {
                label: "Upload Files",
                icon: "fa-cloud-arrow-up"
            }
        ],

        resourceBreakdown: [
            {
                name: "Virtual Machines",
                count: 38,
                percentage: 29,
                color: "#2563eb"
            },
            {
                name: "Blob Storage",
                count: 22,
                percentage: 17,
                color: "#16a34a"
            },
            {
                name: "Azure SQL",
                count: 10,
                percentage: 8,
                color: "#7c3aed"
            },
            {
                name: "Others",
                count: 62,
                percentage: 46,
                color: "#f59e0b"
            }
        ],

        recentActivity: [
            {
                text: "Virtual Machine VM-WebServer started",
                time: "12 minutes ago",
                icon: "fa-play",
                color: "#16a34a"
            },
            {
                text: "Blob container cloudselect-data created",
                time: "1 hour ago",
                icon: "fa-database",
                color: "#16a34a"
            },
            {
                text: "Azure SQL database backup completed",
                time: "3 hours ago",
                icon: "fa-database",
                color: "#2563eb"
            }
        ],

        recommendations: [
            {
                title: "Security",
                message: "Review Azure security center alerts and resolve high-priority issues.",
                icon: "fa-shield-halved",
                color: "#dbeafe"
            },
            {
                title: "Cost Optimization",
                message: "Review unused virtual machines to reduce monthly spending.",
                icon: "fa-money-bill-trend-up",
                color: "#dcfce7"
            }
        ],

        resourceHealth: [
            {
                name: "Virtual Machines",
                count: "38 Machines",
                icon: "fa-server"
            },
            {
                name: "Blob Storage",
                count: "22 Containers",
                icon: "fa-database"
            },
            {
                name: "Azure SQL",
                count: "10 Databases",
                icon: "fa-database"
            }
        ]
    },


    /* =========================================================
       GOOGLE CLOUD
    ========================================================= */

    gcp: {
        name: "Google Cloud",
        logo: "gcp",
        region: "Mumbai",

        account: {
            id: "GCP-1234-5678",
            name: "CloudSelect User"
        },

        overview: {
            totalResources: 118,
            runningResources: 96,
            storageUsed: "2.4 TB",
            monthlyCost: 390,
            health: "Healthy"
        },

        quickActions: [
            {
                label: "Create VM",
                icon: "fa-server"
            },
            {
                label: "Analyze Data",
                icon: "fa-chart-line"
            },
            {
                label: "Create Storage",
                icon: "fa-database"
            },
            {
                label: "Deploy Application",
                icon: "fa-globe"
            }
        ],

        resourceBreakdown: [
            {
                name: "Compute Engine",
                count: 30,
                percentage: 25,
                color: "#2563eb"
            },
            {
                name: "Cloud Storage",
                count: 25,
                percentage: 21,
                color: "#16a34a"
            },
            {
                name: "BigQuery",
                count: 8,
                percentage: 7,
                color: "#7c3aed"
            },
            {
                name: "Others",
                count: 55,
                percentage: 47,
                color: "#f59e0b"
            }
        ],

        recentActivity: [
            {
                text: "Compute Engine instance web-server started",
                time: "15 minutes ago",
                icon: "fa-play",
                color: "#16a34a"
            },
            {
                text: "Cloud Storage bucket analytics-data updated",
                time: "2 hours ago",
                icon: "fa-database",
                color: "#16a34a"
            },
            {
                text: "BigQuery dataset analytics processed",
                time: "4 hours ago",
                icon: "fa-chart-line",
                color: "#2563eb"
            }
        ],

        recommendations: [
            {
                title: "Optimization",
                message: "Use committed use discounts for long-running workloads.",
                icon: "fa-chart-line",
                color: "#dbeafe"
            },
            {
                title: "Cost Optimization",
                message: "Review idle Compute Engine instances to reduce monthly costs.",
                icon: "fa-money-bill-trend-up",
                color: "#dcfce7"
            }
        ],

        resourceHealth: [
            {
                name: "Compute Engine",
                count: "30 Instances",
                icon: "fa-server"
            },
            {
                name: "Cloud Storage",
                count: "25 Buckets",
                icon: "fa-database"
            },
            {
                name: "BigQuery",
                count: "8 Datasets",
                icon: "fa-chart-line"
            }
        ]
    },


    /* =========================================================
       IBM CLOUD
    ========================================================= */

    ibm: {
        name: "IBM Cloud",
        logo: "ibm",
        region: "Mumbai",

        account: {
            id: "IBM-1234-5678",
            name: "CloudSelect User"
        },

        overview: {
            totalResources: 90,
            runningResources: 72,
            storageUsed: "1.8 TB",
            monthlyCost: 320,
            health: "Healthy"
        },

        quickActions: [
            {
                label: "Create Server",
                icon: "fa-server"
            },
            {
                label: "Create Database",
                icon: "fa-database"
            },
            {
                label: "Manage Storage",
                icon: "fa-hard-drive"
            }
        ],

        resourceBreakdown: [
            {
                name: "Virtual Servers",
                count: 20,
                percentage: 22,
                color: "#2563eb"
            },
            {
                name: "Cloud Databases",
                count: 12,
                percentage: 13,
                color: "#16a34a"
            },
            {
                name: "Others",
                count: 58,
                percentage: 65,
                color: "#f59e0b"
            }
        ],

        recentActivity: [
            {
                text: "Virtual server web-server started",
                time: "20 minutes ago",
                icon: "fa-play",
                color: "#16a34a"
            },
            {
                text: "Cloud database backup completed",
                time: "2 hours ago",
                icon: "fa-database",
                color: "#2563eb"
            }
        ],

        recommendations: [
            {
                title: "Security",
                message: "Update access policies regularly and review inactive users.",
                icon: "fa-shield-halved",
                color: "#dbeafe"
            }
        ],

        resourceHealth: [
            {
                name: "Virtual Servers",
                count: "20 Servers",
                icon: "fa-server"
            },
            {
                name: "Cloud Databases",
                count: "12 Databases",
                icon: "fa-database"
            }
        ]
    },


    /* =========================================================
       ORACLE CLOUD
    ========================================================= */

    oracle: {
        name: "Oracle Cloud",
        logo: "oracle",
        region: "Mumbai",

        account: {
            id: "OCI-1234-5678",
            name: "CloudSelect User"
        },

        overview: {
            totalResources: 85,
            runningResources: 70,
            storageUsed: "1.5 TB",
            monthlyCost: 300,
            health: "Healthy"
        },

        quickActions: [
            {
                label: "Create Database",
                icon: "fa-database"
            },
            {
                label: "Create Compute",
                icon: "fa-server"
            },
            {
                label: "Manage Storage",
                icon: "fa-hard-drive"
            }
        ],

        resourceBreakdown: [
            {
                name: "Compute",
                count: 18,
                percentage: 21,
                color: "#2563eb"
            },
            {
                name: "Autonomous Database",
                count: 6,
                percentage: 7,
                color: "#16a34a"
            },
            {
                name: "Others",
                count: 61,
                percentage: 72,
                color: "#f59e0b"
            }
        ],

        recentActivity: [
            {
                text: "Compute instance OCI-WebServer started",
                time: "30 minutes ago",
                icon: "fa-play",
                color: "#16a34a"
            },
            {
                text: "Autonomous Database backup completed",
                time: "3 hours ago",
                icon: "fa-database",
                color: "#2563eb"
            }
        ],

        recommendations: [
            {
                title: "Database",
                message: "Enable automated backups for critical databases.",
                icon: "fa-database",
                color: "#dbeafe"
            }
        ],

        resourceHealth: [
            {
                name: "Compute",
                count: "18 Instances",
                icon: "fa-server"
            },
            {
                name: "Autonomous Database",
                count: "6 Databases",
                icon: "fa-database"
            }
        ]
    },


    /* =========================================================
       SIFY CLOUD
    ========================================================= */

    sify: {
        name: "Sify Cloud",
        logo: "sify",
        region: "Mumbai",

        account: {
            id: "SIFY-1234",
            name: "CloudSelect User"
        },

        overview: {
            totalResources: 75,
            runningResources: 60,
            storageUsed: "1.2 TB",
            monthlyCost: 260,
            health: "Healthy"
        },

        quickActions: [
            {
                label: "Create Server",
                icon: "fa-server"
            },
            {
                label: "Manage Storage",
                icon: "fa-database"
            },
            {
                label: "Deploy Application",
                icon: "fa-globe"
            }
        ],

        resourceBreakdown: [
            {
                name: "Cloud Servers",
                count: 25,
                percentage: 33,
                color: "#2563eb"
            },
            {
                name: "Storage Services",
                count: 18,
                percentage: 24,
                color: "#16a34a"
            },
            {
                name: "Others",
                count: 32,
                percentage: 43,
                color: "#f59e0b"
            }
        ],

        recentActivity: [
            {
                text: "Cloud server production-01 started",
                time: "45 minutes ago",
                icon: "fa-play",
                color: "#16a34a"
            },
            {
                text: "Storage service backup completed",
                time: "3 hours ago",
                icon: "fa-database",
                color: "#2563eb"
            }
        ],

        recommendations: [
            {
                title: "Performance",
                message: "Optimize server allocation for better performance.",
                icon: "fa-gauge-high",
                color: "#dbeafe"
            }
        ],

        resourceHealth: [
            {
                name: "Cloud Servers",
                count: "25 Servers",
                icon: "fa-server"
            },
            {
                name: "Storage Services",
                count: "18 Services",
                icon: "fa-database"
            }
        ]
    },


    /* =========================================================
       YOTTA DATA SERVICES
    ========================================================= */

    yotta: {
        name: "Yotta Data Services",
        logo: "yotta",
        region: "Mumbai",

        account: {
            id: "YOTTA-1234",
            name: "CloudSelect User"
        },

        overview: {
            totalResources: 68,
            runningResources: 55,
            storageUsed: "950 GB",
            monthlyCost: 220,
            health: "Healthy"
        },

        quickActions: [
            {
                label: "Deploy GPU Instance",
                icon: "fa-microchip"
            },
            {
                label: "Manage Storage",
                icon: "fa-database"
            },
            {
                label: "Monitor GPU",
                icon: "fa-chart-line"
            }
        ],

        resourceBreakdown: [
            {
                name: "GPU Cloud",
                count: 15,
                percentage: 22,
                color: "#7c3aed"
            },
            {
                name: "Storage Cloud",
                count: 20,
                percentage: 29,
                color: "#16a34a"
            },
            {
                name: "Others",
                count: 33,
                percentage: 49,
                color: "#f59e0b"
            }
        ],

        recentActivity: [
            {
                text: "GPU instance AI-01 started",
                time: "25 minutes ago",
                icon: "fa-play",
                color: "#16a34a"
            },
            {
                text: "Storage Cloud resource updated",
                time: "2 hours ago",
                icon: "fa-database",
                color: "#2563eb"
            }
        ],

        recommendations: [
            {
                title: "AI Optimization",
                message: "Use GPU resources efficiently for AI workloads.",
                icon: "fa-microchip",
                color: "#ede9fe"
            }
        ],

        resourceHealth: [
            {
                name: "GPU Cloud",
                count: "15 Instances",
                icon: "fa-microchip"
            },
            {
                name: "Storage Cloud",
                count: "20 Resources",
                icon: "fa-database"
            }
        ]
    },


    /* =========================================================
       TATA COMMUNICATIONS IZO
    ========================================================= */

    tata: {
        name: "Tata Communications IZO",
        logo: "tata",
        region: "Mumbai",

        account: {
            id: "TATA-1234",
            name: "CloudSelect User"
        },

        overview: {
            totalResources: 80,
            runningResources: 65,
            storageUsed: "1.4 TB",
            monthlyCost: 280,
            health: "Healthy"
        },

        quickActions: [
            {
                label: "Create Cloud Resource",
                icon: "fa-cloud"
            },
            {
                label: "Manage Network",
                icon: "fa-network-wired"
            },
            {
                label: "Deploy Application",
                icon: "fa-globe"
            }
        ],

        resourceBreakdown: [
            {
                name: "Cloud Hosting",
                count: 30,
                percentage: 38,
                color: "#2563eb"
            },
            {
                name: "Network Services",
                count: 15,
                percentage: 19,
                color: "#16a34a"
            },
            {
                name: "Others",
                count: 35,
                percentage: 43,
                color: "#f59e0b"
            }
        ],

        recentActivity: [
            {
                text: "Cloud hosting resource deployed",
                time: "40 minutes ago",
                icon: "fa-cloud",
                color: "#16a34a"
            },
            {
                text: "Network configuration updated",
                time: "3 hours ago",
                icon: "fa-network-wired",
                color: "#2563eb"
            }
        ],

        recommendations: [
            {
                title: "Network",
                message: "Monitor network traffic regularly to identify unusual usage.",
                icon: "fa-network-wired",
                color: "#dbeafe"
            }
        ],

        resourceHealth: [
            {
                name: "Cloud Hosting",
                count: "30 Resources",
                icon: "fa-cloud"
            },
            {
                name: "Network Services",
                count: "15 Services",
                icon: "fa-network-wired"
            }
        ]
    },


    /* =========================================================
       NXTRA DATA
    ========================================================= */

    nxtra: {
        name: "Nxtra Data (Airtel)",
        logo: "nxtra",
        region: "Mumbai",

        account: {
            id: "NXTRA-1234",
            name: "CloudSelect User"
        },

        overview: {
            totalResources: 72,
            runningResources: 58,
            storageUsed: "1.1 TB",
            monthlyCost: 240,
            health: "Healthy"
        },

        quickActions: [
            {
                label: "Create Backup",
                icon: "fa-database"
            },
            {
                label: "Manage Storage",
                icon: "fa-hard-drive"
            },
            {
                label: "Monitor Data Center",
                icon: "fa-server"
            }
        ],

        resourceBreakdown: [
            {
                name: "Data Center Cloud",
                count: 22,
                percentage: 31,
                color: "#2563eb"
            },
            {
                name: "Backup Services",
                count: 14,
                percentage: 19,
                color: "#16a34a"
            },
            {
                name: "Others",
                count: 36,
                percentage: 50,
                color: "#f59e0b"
            }
        ],

        recentActivity: [
            {
                text: "Backup policy completed successfully",
                time: "35 minutes ago",
                icon: "fa-database",
                color: "#16a34a"
            },
            {
                text: "Data center cloud resource updated",
                time: "2 hours ago",
                icon: "fa-server",
                color: "#2563eb"
            }
        ],

        recommendations: [
            {
                title: "Backup",
                message: "Enable automated backup policies for critical resources.",
                icon: "fa-database",
                color: "#dbeafe"
            }
        ],

        resourceHealth: [
            {
                name: "Data Center Cloud",
                count: "22 Resources",
                icon: "fa-server"
            },
            {
                name: "Backup Services",
                count: "14 Services",
                icon: "fa-database"
            }
        ]
    }

};