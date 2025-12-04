import { Server, Laptop, Network, Database, Building2, Armchair, Truck, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

const configItems = [
  { icon: Server, label: "Hardware", color: "bg-blue-100", iconColor: "text-blue-500" },
  { icon: Laptop, label: "Software", color: "bg-purple-100", iconColor: "text-purple-500" },
  { icon: Network, label: "Network & IT Infrastructure", color: "bg-pink-100", iconColor: "text-pink-500" },
  { icon: Database, label: "Data & Information", color: "bg-orange-100", iconColor: "text-orange-500" },
  { icon: Building2, label: "Buildings & Facilities", color: "bg-green-100", iconColor: "text-green-500" },
  { icon: Armchair, label: "Office Equipment & Furniture", color: "bg-cyan-100", iconColor: "text-cyan-500" },
  { icon: Truck, label: "Official & Operational Vehicles", color: "bg-red-100", iconColor: "text-red-500" },
  { icon: Wrench, label: "Facility & Operational Support Equipment", color: "bg-indigo-100", iconColor: "text-indigo-500" },
];

const CMDB = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/cmdb/category/${encodeURIComponent(category)}`);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-foreground mb-8">CMDB</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {configItems.map((item) => (
          <div 
            key={item.label} 
            onClick={() => handleCategoryClick(item.label)}
            className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow cursor-pointer h-full"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`${item.color} p-4 rounded-lg`}>
                <item.icon className={`h-8 w-8 ${item.iconColor}`} />
              </div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMDB;
