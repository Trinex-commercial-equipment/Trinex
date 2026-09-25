export interface SparePart {
  id: string;
  partName: string;
  category: string;
  partCode: string;
  description: string;
  compatibility: string[];
  inStock: boolean;
  specs: { [key: string]: string };
}

export const SPARE_PARTS: SparePart[] = [
  {
    id: "sp-01",
    partName: "High-Output Commercial Brass Burner Assembly",
    category: "Cooking Spares",
    partCode: "TX-SP-BRN-304",
    description: "Heavy cast brass burner head with precision drilled gas ports for maximum heat distribution and thermal stability.",
    compatibility: ["Gas Cooking Ranges", "Stock Pot Burners", "Chinese Wok Ranges"],
    inStock: true,
    specs: {
      "Material": "Heavy Cast Brass & Cast Iron",
      "Gas Rating": "30,000 BTU / hr",
      "Nozzle Diameter": "1.8 mm"
    }
  },
  {
    id: "sp-02",
    partName: "Digital Micro-Processor Temperature Controller",
    category: "Electrical & Electronics",
    partCode: "TX-SP-TC-900",
    description: "High-precision digital thermostat controller with dual LED display, NTC/PTC sensor probe input, and alarm buzzer output.",
    compatibility: ["Upright Chillers", "Freezers", "Bakery Proofer Cabinets"],
    inStock: true,
    specs: {
      "Temp Range": "-50°C to +99°C",
      "Voltage": "220V AC ± 10%",
      "Sensor Included": "2m NTC Thermistor Probe"
    }
  },
  {
    id: "sp-03",
    partName: "Heavy-Duty Commercial Refrigeration Compressor",
    category: "Refrigeration Spares",
    partCode: "TX-SP-CMP-R290",
    description: "Hermetic reciprocating compressor engineered for high ambient commercial kitchen temperature environments.",
    compatibility: ["Under-counter Prep Tables", "Vertical Chillers", "Display Coolers"],
    inStock: true,
    specs: {
      "Displacement": "14.3 cc",
      "Refrigerant": "R290 Eco Gas",
      "Power Rating": "1/2 HP"
    }
  },
  {
    id: "sp-04",
    partName: "Food-Grade Silicone Magnetic Door Gasket Seal",
    category: "Refrigeration & Oven Seals",
    partCode: "TX-SP-GSK-CUSTOM",
    description: "Press-fit high-elasticity magnetic gasket frame resistant to oils, grease, and extreme temperature variations.",
    compatibility: ["All Upright Chillers", "Reach-In Freezers", "Hot Holding Cabinets"],
    inStock: true,
    specs: {
      "Material": "Sanitary Grade Mold-Resistant PVC/Silicone",
      "Profile Type": "Dart Push-In Profile",
      "Custom Sizing": "Made to order per door frame"
    }
  },
  {
    id: "sp-05",
    partName: "AISI 304 Stainless Steel Electric Heating Element",
    category: "Electrical & Heating",
    partCode: "TX-SP-HTR-3KW",
    description: "Incoloy / SS 304 tubular heating element for deep fryers, water bain-maries, and deck ovens.",
    compatibility: ["Commercial Fryers", "Bain-Maries", "Dishwasher Rinse Tanks"],
    inStock: true,
    specs: {
      "Wattage": "3000W / 4500W Options",
      "Voltage": "230V Single Phase / 415V 3-Phase",
      "Terminal Type": "M4 Threaded Screw Terminals"
    }
  },
  {
    id: "sp-06",
    partName: "Dual Speed Motor & Gearbox Impeller",
    category: "Mechanical & Motors",
    partCode: "TX-SP-MTR-SPIRAL",
    description: "Heavy-duty copper winding motor with hardened alloy steel gearbox for spiral mixers and food cutters.",
    compatibility: ["Spiral Dough Mixers", "Planetary Mixers", "Meat Mincers"],
    inStock: true,
    specs: {
      "Rating": "2.2 kW Heavy Torque",
      "RPM": "1400 / 2800 Dual Speed",
      "Insulation Class": "Class F"
    }
  },
  {
    id: "sp-07",
    partName: "Brass Solenoid Water Inlet Valve",
    category: "Washing & Plumbing",
    partCode: "TX-SP-VALVE-24V",
    description: "2-way normally closed solenoid valve designed for automatic water filling in dishwashers and combi steamers.",
    compatibility: ["Commercial Dishwashers", "Combi Ovens", "Ice Machines"],
    inStock: true,
    specs: {
      "Port Size": "3/4 inch BSP",
      "Coil Voltage": "24V AC / 220V AC",
      "Max Pressure": "10 Bar"
    }
  },
  {
    id: "sp-08",
    partName: "Heavy-Duty Swivel Castor Wheels with Foot Brake",
    category: "Hardware & Mobiles",
    partCode: "TX-SP-CSTR-125",
    description: "Non-marking polyurethane tread castor wheels with double ball bearing swivel head and side lock brake.",
    compatibility: ["Work Tables", "Storage Trolleys", "Mobile Rack Racks"],
    inStock: true,
    specs: {
      "Wheel Diameter": "125 mm (5 Inch)",
      "Load Rating": "150 kg Per Wheel",
      "Mounting": "Threaded Stem / Plate Mount"
    }
  }
];
