export interface Property {
  id: number;
  images: string[];
  price: string;
  title: string;
  description: string;
  location: string;
  date: string;
  isFeatured: boolean;
  category: 'house' | 'apartment' | 'villa' | 'land';
  type: string;
  listingType?: 'rent' | 'sale';
  contact?: {
    name: string;
    phoneNumbers: string[];
    mapUrl: string;
  };
  visitTimes?: string[];
  createdBy?: string; // Added to track creator user ID for user-created properties
}


//House OR  Apartment OR Villas OR Lands inside scroll images.......


export const allProperties: Property[] = [
  // Houses (6)
  {
    id: 1,
    images: [
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg"
    ],
    price: "₹ 25,00,000",
    title: "3 BHK Independent House",
    description: "Spacious family home with garden",
    location: "SECTOR 21, GURGAON",
    date: "2 DAYS AGO",
    isFeatured: true,
    category: 'house',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Rajesh Kumar",
      phoneNumbers: [" 9551424567 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.123!2d77.0266!2d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sSector%2021%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 2,
    images: [
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 18,50,000",
    title: "2 BHK Row House",
    description: "Modern design with parking",
    location: "DWARKA, NEW DELHI",
    date: "4 DAYS AGO",
    isFeatured: false,
    category: 'house',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Priya Sharma",
      phoneNumbers: [" 8015123456 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.456!2d77.0500!2d28.5700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b8b5c8d7e9f%3A0x8b5c8d7e9f0a1b2c!2sDwarka%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 3,
    images: [
      "/src/assets/house-1.jpg",
      "/src/assets/house-3.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 35,00,000",
    title: "4 BHK Duplex House",
    description: "Luxury duplex with terrace",
    location: "BANJARA HILLS, HYDERABAD",
    date: "1 WEEK AGO",
    isFeatured: true,
    category: 'house',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Amit Reddy",
      phoneNumbers: [" 9876543212 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.789!2d78.4300!2d17.4100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93b3b3b3b3b3%3A0x3b3b3b3b3b3b3b3b!2sBanjara%20Hills%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 4,
    images: [
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 22,00,000",
    title: "3 BHK Villa Style",
    description: "Villa style independent house",
    location: "KORAMANGALA, BANGALORE",
    date: "3 DAYS AGO",
    isFeatured: false,
    category: 'house',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Sunita Patel",
      phoneNumbers: [" 9876543213 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.123!2d77.6200!2d12.9400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14d4d4d4d4d4%3A0x4d4d4d4d4d4d4d4d!2sKoramangala%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 16,
    images: [
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 28,00,000",
    title: "2 BHK Cottage Style",
    description: "Beautiful cottage with garden",
    location: "JUBILEE HILLS, HYDERABAD",
    date: "5 DAYS AGO",
    isFeatured: false,
    category: 'house',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Vikram Singh",
      phoneNumbers: [" 9876543214 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.456!2d78.4200!2d17.4300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93c4c4c4c4c4%3A0x4c4c4c4c4c4c4c4c!2sJubilee%20Hills%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 17,
    images: [
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg"
    ],
    price: "₹ 45,00,000",
    title: "5 BHK Luxury House",
    description: "Premium luxury independent house",
    location: "DEFENSE COLONY, NEW DELHI",
    date: "1 DAY AGO",
    isFeatured: true,
    category: 'house',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Meera Gupta",
      phoneNumbers: [" 9876543215 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.789!2d77.2300!2d28.5700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1c9c9c9c9c9c%3A0x9c9c9c9c9c9c9c9c!2sDefence%20Colony%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },

  // Apartments (6)
  {
    id: 5,
    images: [
      "/src/assets/apartment-1.jpg",
      "/src/assets/apartment-2.jpg",
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg"
    ],
    price: "₹ 15,00,000",
    title: "2 BHK Apartment",
    description: "Modern apartment with amenities",
    location: "INDIRANAGAR, BANGALORE",
    date: "1 DAY AGO",
    isFeatured: true,
    category: 'apartment',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Rahul Sharma",
      phoneNumbers: [" 9876543210 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.456!2d77.6400!2d12.9700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14e4e4e4e4e4%3A0x4e4e4e4e4e4e4e4e!2sIndiranagar%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 6,
    images: [
      "/src/assets/apartment-2.jpg",
      "/src/assets/apartment-1.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 12,50,000",
    title: "1 BHK Studio Apartment",
    description: "Compact and well-designed studio",
    location: "POWAI, MUMBAI",
    date: "3 DAYS AGO",
    isFeatured: false,
    category: 'apartment',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Priya Singh",
      phoneNumbers: [" 9876543211 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.789!2d72.9000!2d19.1200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8f0c8f0c8f0%3A0xc8f0c8f0c8f0c8f0!2sPowai%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 7,
    images: [
      "/src/assets/apartment-1.jpg",
      "/src/assets/apartment-2.jpg",
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg"
    ],
    price: "₹ 22,00,000",
    title: "3 BHK Premium Apartment",
    description: "Luxury apartment with city view",
    location: "CYBER CITY, GURGAON",
    date: "2 DAYS AGO",
    isFeatured: true,
    category: 'apartment',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Amit Kumar",
      phoneNumbers: [" 9876543212 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.456!2d77.0300!2d28.4900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1a8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sCyber%20City%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 8,
    images: [
      "/src/assets/apartment-2.jpg",
      "/src/assets/apartment-1.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 18,00,000",
    title: "2 BHK Furnished Apartment",
    description: "Fully furnished ready to move",
    location: "HITECH CITY, HYDERABAD",
    date: "4 DAYS AGO",
    isFeatured: false,
    category: 'apartment',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Sunita Reddy",
      phoneNumbers: [" 9876543213 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123!2d78.3700!2d17.4500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93d4d4d4d4d4%3A0x4d4d4d4d4d4d4d4d!2sHitech%20City%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 18,
    images: [
      "/src/assets/apartment-1.jpg",
      "/src/assets/apartment-2.jpg",
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg"
    ],
    price: "₹ 35,00,000",
    title: "4 BHK Penthouse",
    description: "Luxury penthouse with terrace",
    location: "WORLI, MUMBAI",
    date: "1 WEEK AGO",
    isFeatured: true,
    category: 'apartment',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Vikram Patel",
      phoneNumbers: [" 9876543214 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.456!2d72.8200!2d19.0100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9e9e9e9e9e9%3A0x9e9e9e9e9e9e9e9e!2sWorli%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 19,
    images: [
      "/src/assets/apartment-2.jpg",
      "/src/assets/apartment-1.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 8,50,000",
    title: "1 BHK Compact Apartment",
    description: "Affordable compact living space",
    location: "WHITEFIELD, BANGALORE",
    date: "6 DAYS AGO",
    isFeatured: false,
    category: 'apartment',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Meera Gupta",
      phoneNumbers: [" 9876543215 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.789!2d77.7300!2d12.9800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14f4f4f4f4f4%3A0x4f4f4f4f4f4f4f4f!2sWhitefield%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },

  // Villas (6)
  {
    id: 9,
    images: [
      "/src/assets/villa-1.jpg",
      "/src/assets/villa-2.jpg",
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg"
    ],
    price: "₹ 85,00,000",
    title: "4 BHK Luxury Villa",
    description: "Premium villa with swimming pool",
    location: "JUBILEE HILLS, HYDERABAD",
    date: "2 DAYS AGO",
    isFeatured: true,
    category: 'villa',
    type: 'luxury',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Rajesh Reddy",
      phoneNumbers: [" 9876543216 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.789!2d78.4300!2d17.4100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93b3b3b3b3b3%3A0x3b3b3b3b3b3b3b3b!2sJubilee%20Hills%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 10,
    images: [
      "/src/assets/villa-2.jpg",
      "/src/assets/villa-1.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 65,00,000",
    title: "3 BHK Garden Villa",
    description: "Beautiful villa with landscaped garden",
    location: "WHITEFIELD, BANGALORE",
    date: "1 DAY AGO",
    isFeatured: true,
    category: 'villa',
    type: 'luxury',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Priya Sharma",
      phoneNumbers: [" 9876543217 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.123!2d77.6200!2d12.9400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14d4d4d4d4d4%3A0x4d4d4d4d4d4d4d4d!2sWhitefield%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 11,
    images: [
      "/src/assets/villa-1.jpg",
      "/src/assets/villa-2.jpg",
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg"
    ],
    price: "₹ 1,20,00,000",
    title: "5 BHK Premium Villa",
    description: "Ultra-luxury villa with all amenities",
    location: "BANDRA, MUMBAI",
    date: "4 DAYS AGO",
    isFeatured: true,
    category: 'villa',
    type: 'luxury',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Amit Singh",
      phoneNumbers: [" 9876543218 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.789!2d72.8400!2d19.0600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8a8a8a8a8a8%3A0x8a8a8a8a8a8a8a8a!2sBandra%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 20,
    images: [
      "/src/assets/villa-2.jpg",
      "/src/assets/villa-1.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 95,00,000",
    title: "4 BHK Modern Villa",
    description: "Contemporary design with smart features",
    location: "DLF PHASE 3, GURGAON",
    date: "3 DAYS AGO",
    isFeatured: false,
    category: 'villa',
    type: 'luxury',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Sunita Kumar",
      phoneNumbers: [" 9876543219 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.456!2d77.1000!2d28.4800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1a9b9b9b9b9b%3A0x9b9b9b9b9b9b9b9b!2sDLF%20Phase%203%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 21,
    images: [
      "/src/assets/villa-2.jpg",
      "/src/assets/villa-1.jpg",
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg"
    ],
    price: "₹ 75,00,000",
    title: "3 BHK Pool Villa",
    description: "Villa with private swimming pool",
    location: "ECR, CHENNAI",
    date: "5 DAYS AGO",
    isFeatured: false,
    category: 'villa',
    type: 'luxury',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Vikram Rao",
      phoneNumbers: [" 9876543220 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.789!2d80.2700!2d12.9800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d9d9d9d9d9d%3A0x9d9d9d9d9d9d9d9d!2sEast%20Coast%20Road%2C%20Chennai!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 22,
    images: [
      "/src/assets/villa-1.jpg",
      "/src/assets/villa-2.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 2,00,00,000",
    title: "6 BHK Luxury Villa",
    description: "Grand villa with multiple amenities",
    location: "GOLF COURSE ROAD, GURGAON",
    date: "1 WEEK AGO",
    isFeatured: true,
    category: 'villa',
    type: 'luxury',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Meera Singh",
      phoneNumbers: [" 9876543221 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.789!2d77.0500!2d28.4500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b0b0b0b0b0b%3A0x0b0b0b0b0b0b0b0b!2sGolf%20Course%20Road%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },

  // Lands (6)
  {
    id: 12,
    images: [
      "/src/assets/land-1.jpg",
      "/src/assets/land-2.jpg",
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg"
    ],
    price: "₹ 45,00,000",
    title: "5000 sq ft Residential Plot",
    description: "Prime residential plot for construction",
    location: "SECTOR 45, NOIDA",
    date: "1 DAY AGO",
    isFeatured: true,
    category: 'land',
    type: 'plot',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Rajesh Gupta",
      phoneNumbers: [" 9876543222 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.123!2d77.3200!2d28.5700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a5a5a5a5a5%3A0xa5a5a5a5a5a5a5a5!2sSector%2045%2C%20Noida!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 13,
    images: [
      "/src/assets/land-2.jpg",
      "/src/assets/land-1.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 25,00,000",
    title: "3000 sq ft Plot",
    description: "Ready to construct residential plot",
    location: "ELECTRONIC CITY, BANGALORE",
    date: "3 DAYS AGO",
    isFeatured: false,
    category: 'land',
    type: 'plot',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Priya Patel",
      phoneNumbers: [" 9876543223 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.456!2d77.6700!2d12.8400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c8c8c8c8c8c%3A0x8c8c8c8c8c8c8c8c!2sElectronic%20City%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 14,
    images: [
      "/src/assets/land-1.jpg",
      "/src/assets/land-2.jpg",
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg"
    ],
    price: "₹ 80,00,000",
    title: "8000 sq ft Commercial Land",
    description: "Prime commercial plot near highway",
    location: "NH8, GURGAON",
    date: "2 DAYS AGO",
    isFeatured: true,
    category: 'land',
    type: 'commercial',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Amit Sharma",
      phoneNumbers: [" 9876543224 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.789!2d77.0300!2d28.4200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b1b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sNH8%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 15,
    images: [
      "/src/assets/land-1.jpg",
      "/src/assets/land-2.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 1,20,00,000",
    title: "1 Acre Farm Land",
    description: "Agricultural land with water facility",
    location: "OUTSKIRTS, PUNE",
    date: "1 WEEK AGO",
    isFeatured: true,
    category: 'land',
    type: 'agricultural',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Sunita Rao",
      phoneNumbers: [" 9876543225 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.456!2d73.8500!2d18.5200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1c1c1c1c1c1%3A0xc1c1c1c1c1c1c1c1!2sPune!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 23,
    images: [
      "/src/assets/land-2.jpg",
      "/src/assets/land-1.jpg",
      "/src/assets/house-1.jpg",
      "/src/assets/house-2.jpg",
      "/src/assets/house-3.jpg"
    ],
    price: "₹ 35,00,000",
    title: "4000 sq ft Corner Plot",
    description: "Corner plot with good connectivity",
    location: "KOMPALLY, HYDERABAD",
    date: "4 DAYS AGO",
    isFeatured: false,
    category: 'land',
    type: 'plot',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Vikram Kumar",
      phoneNumbers: [" 9876543226 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123!2d78.4800!2d17.5300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9d2d2d2d2d2d%3A0x2d2d2d2d2d2d2d2d!2sKompally%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 24,
    images: [
      "/src/assets/land-2.jpg",
      "/src/assets/land-1.jpg",
      "/src/assets/house-4.jpg",
      "/src/assets/house-5.jpg",
      "/src/assets/house-6.jpg"
    ],
    price: "₹ 60,00,000",
    title: "6000 sq ft Industrial Plot",
    description: "Industrial plot in developed area",
    location: "OKHLA, NEW DELHI",
    date: "5 DAYS AGO",
    isFeatured: false,
    category: 'land',
    type: 'industrial',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Meera Singh",
      phoneNumbers: [" 9876543227 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.789!2d77.2800!2d28.5300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1e1e1e1e1e1%3A0xe1e1e1e1e1e1e1e1!2sOkhla%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },

  // PropertyListings properties (IDs 1-6 with different data)


                   //After i click view Details 
  {
    id: 25,
    images: ["/src/assets/house-3.jpg", "/src/assets/house-1.jpg", "/src/assets/house-3.jpg"],
    price: "$450,000",
    title: "Modern Family House",
    description: "Beautiful modern house with spacious rooms and garden",
    location: "Beverly Hills, CA",
    date: "2 DAYS AGO",
    isFeatured: true,
    category: 'house',
    type: 'residential',
    contact: {
      name: "John Smith",
      phoneNumbers: [" 7904613690 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.765!2d-118.4006!2d34.0696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sBeverly%20Hills%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
    }
  },
  {
    id: 26,
    images: ["/src/assets/apartment-1.jpg", "/src/assets/apartment-2.jpg", "/src/assets/house-4.jpg"],
    price: "$320,000",
    title: "Downtown Luxury Apartment",
    description: "Luxury apartment in the heart of the city",
    location: "Manhattan, NY",
    date: "4 DAYS AGO",
    isFeatured: false,
    category: 'apartment',
    type: 'residential',
    contact: {
      name: "Alice Johnson",
      phoneNumbers: [" 2345678901 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.123!2d-73.9857!2d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18f0a1b7%3A0x4a1b2c3d4e5f6789!2sManhattan%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1690000000001!5m2!1sen!2sus"
    }
  },
  {
    id: 27,
    images: ["/src/assets/villa-1.jpg", "/src/assets/villa-2.jpg", "/src/assets/house-5.jpg"],
    price: "$1,200,000",
    title: "Premium Villa with Pool",
    description: "Stunning villa with swimming pool and ocean view",
    location: "Miami Beach, FL",
    date: "1 WEEK AGO",
    isFeatured: true,
    category: 'villa',
    type: 'luxury',
    contact: {
      name: "Bob Wilson",
      phoneNumbers: [" 3456789012 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.345!2d-80.1918!2d25.7617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c9d1%3A0x9b1c2d3e4f5a6789!2sMiami%20Beach%2C%20FL%2C%20USA!5e0!3m2!1sen!2sus!4v1690000000002!5m2!1sen!2sus"
    }
  },
  {
    id: 28,
    images: ["/src/assets/land-1.jpg", "/src/assets/land-2.jpg", "/src/assets/house-6.jpg"],
    price: "$180,000",
    title: "Development Land Plot",
    description: "Prime location for residential development",
    location: "Austin, TX",
    date: "3 DAYS AGO",
    isFeatured: false,
    category: 'land',
    type: 'plot',
    contact: {
      name: "Charlie Brown",
      phoneNumbers: [" 4567890123 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.678!2d-97.7431!2d30.2672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b0c1d2e3f4a5b!2sAustin%2C%20TX%2C%20USA!5e0!3m2!1sen!2sus!4v1690000000003!5m2!1sen!2sus"
    }
  },
  {
    id: 29,
    images: ["/src/assets/house-2.jpg", "/src/assets/house-3.jpg", "/src/assets/apartment-1.jpg"],
    price: "$280,000",
    title: "Cozy Suburban House",
    description: "Perfect starter home in quiet neighborhood",
    location: "Phoenix, AZ",
    date: "5 DAYS AGO",
    isFeatured: false,
    category: 'house',
    type: 'residential',
    contact: {
      name: "Diana Prince",
      phoneNumbers: [" 5678901234 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.567!2d-112.0740!2d33.4484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a179cb%3A0x8c69c7f847d1f5e4!2sPhoenix%2C%20AZ%2C%20USA!5e0!3m2!1sen!2sus!4v1690000000004!5m2!1sen!2sus"
    }
  },
  {
    id: 30,
    images: ["/src/assets/apartment-2.jpg", "/src/assets/villa-1.jpg", "/src/assets/house-1.jpg"],
    price: "$850,000",
    title: "Penthouse Apartment",
    description: "Luxury penthouse with city skyline views",
    location: "Chicago, IL",
    date: "1 DAY AGO",
    isFeatured: true,
    category: 'apartment',
    type: 'luxury',
    contact: {
      name: "Eve Adams",
      phoneNumbers: [" 6789012345 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.909!2d-87.6298!2d41.8781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09e0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sus!4v1690000000005!5m2!1sen!2sus"
    }
  },

  // PropertyListingMore properties (IDs 101-106)

             


                 //Load More Properties inside pages

  {
    id: 101,
    images: ["/src/assets/house-3.jpg", "/src/assets/apartment-2.jpg", "/src/assets/house-1.jpg"],
    price: "₹ 32,00,000",
    title: "4 BHK Modern Apartment",
    description: "Contemporary apartment with smart home features",
    location: "MARATHAHALLI, BANGALORE",
    date: "1 DAY AGO",
    isFeatured: true,
    category: 'apartment',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Rajesh Kumar",
      phoneNumbers: [" 9876543228 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.123!2d77.7000!2d12.9500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e5e5e5e5e5%3A0xe5e5e5e5e5e5e5e5!2sMarathahalli%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 102,
    images: ["/src/assets/house-1.jpg", "/src/assets/villa-2.jpg", "/src/assets/house-2.jpg"],
    price: "₹ 75,00,000",
    title: "5 BHK Luxury Villa",
    description: "Exclusive villa with private garden and pool",
    location: "RAJARHAT, KOLKATA",
    date: "3 DAYS AGO",
    isFeatured: true,
    category: 'villa',
    type: 'luxury',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Priya Singh",
      phoneNumbers: [" 9876543229 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.456!2d88.4300!2d22.5700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f653%3A0x531c9e1dbfffb6a!2sRajarhat%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 103,
    images: ["/src/assets/land-1.jpg", "/src/assets/land-2.jpg", "/src/assets/house-3.jpg"],
    price: "₹ 15,00,000",
    title: "2000 sq ft Residential Plot",
    description: "Prime location plot ready for construction",
    location: "INDORE, MADHYA PRADESH",
    date: "2 DAYS AGO",
    isFeatured: false,
    category: 'land',
    type: 'plot',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Amit Kumar",
      phoneNumbers: [" 9876543230 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.789!2d75.8577!2d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302eaf403f6a1%3A0x3a7c6e1b0c4d5e6f!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 104,
    images: ["/src/assets/house-4.jpg", "/src/assets/house-5.jpg", "/src/assets/apartment-1.jpg"],
    price: "₹ 42,00,000",
    title: "3 BHK Bungalow",
    description: "Spacious bungalow with modern amenities",
    location: "SALT LAKE, KOLKATA",
    date: "5 DAYS AGO",
    isFeatured: false,
    category: 'house',
    type: 'residential',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Sunita Reddy",
      phoneNumbers: [" 9876543231 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.123!2d88.4000!2d22.5800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882e4e4e4e4e4%3A0x4e4e4e4e4e4e4e4e!2sSalt%20Lake%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 105,
    images: ["/src/assets/apartment-2.jpg", "/src/assets/villa-1.jpg", "/src/assets/house-6.jpg"],
    price: "₹ 55,00,000",
    title: "4 BHK Penthouse",
    description: "Luxury penthouse with panoramic city views",
    location: "ANDHERI, MUMBAI",
    date: "1 WEEK AGO",
    isFeatured: true,
    category: 'apartment',
    type: 'luxury',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Vikram Patel",
      phoneNumbers: [" 9876543232 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.456!2d72.8700!2d19.1200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8f8f8f8f8f8%3A0xf8f8f8f8f8f8f8f8!2sAndheri%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 106,
    images: ["/src/assets/land-2.jpg", "/src/assets/house-1.jpg", "/src/assets/villa-2.jpg"],
    price: "₹ 8,00,000",
    title: "1500 sq ft Commercial Plot",
    description: "Strategic location for business development",
    location: "JAIPUR, RAJASTHAN",
    date: "4 DAYS AGO",
    isFeatured: false,
    category: 'land',
    type: 'commercial',
    listingType: 'sale',
    visitTimes: ["10:00 AM - 12:00 PM"],
    contact: {
      name: "Meera Singh",
      phoneNumbers: [" 9876543233 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.789!2d75.7873!2d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5a2a2a2a2a2%3A0xa2a2a2a2a2a2a2a2!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  }
];

export const searchProperties = (query: string): Property[] => {
  if (!query.trim()) return allProperties;

  const searchTerm = query.toLowerCase().trim();

  // Exact category searches return ONLY that category (match "View More" pages)
  const categoryMap: Record<string, Property['category']> = {
    house: 'house',
    houses: 'house',
    apartment: 'apartment',
    apartments: 'apartment',
    flat: 'apartment',
    flats: 'apartment',
    villa: 'villa',
    villas: 'villa',
    land: 'land',
    lands: 'land',
    plot: 'land',
    plots: 'land',
  };

  if (categoryMap[searchTerm]) {
    const category = categoryMap[searchTerm];
    return allProperties.filter((p) => p.category === category);
  }

  // General keyword search across fields
  return allProperties.filter((property) => {
    if (property.title.toLowerCase().includes(searchTerm)) return true;
    if (property.description.toLowerCase().includes(searchTerm)) return true;
    if (property.location.toLowerCase().includes(searchTerm)) return true;
    if (property.type.toLowerCase().includes(searchTerm)) return true;
    return false;
  });
};