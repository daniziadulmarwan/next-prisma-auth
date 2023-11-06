import {
  BarChart2,
  LineChart,
  PieChart,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import React from "react";

function AdminSidebar() {
  return (
    <div className="w-[245px] h-screen bg-white px-6 pt-12">
      <div id="brand" className="flex gap-6 items-center">
        <img src="/images/logo.png" alt="Dabang Icon" className="h-8 w-8" />
        <span className="text-lg font-semibold">Dabang</span>
      </div>

      <div id="menus" className="mt-14">
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="flex items-center px-6 rounded-2xl gap-6 py-3 active"
            >
              <PieChart size={20} color="#fff" />
              <span className="font-semibold">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-6 rounded-2xl gap-6 py-3"
            >
              <BarChart2 size={32} />
              <span className="font-semibold">Leaderboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-6 rounded-2xl gap-6 py-3"
            >
              <ShoppingCart size={32} />
              <span className="font-semibold">Order</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-6 rounded-2xl gap-6 py-3"
            >
              <ShoppingBag size={32} />
              <span className="font-semibold">Products</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-6 rounded-2xl gap-6 py-3"
            >
              <LineChart size={32} />
              <span className="font-semibold">Sales Report</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
