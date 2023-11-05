import { ChevronLeft, User2 } from "lucide-react";
import LogoutButton from "./logout";

async function Dashboard() {
  return (
    <main className="py-4 px-4 gap-4 flex items-center">
      <div className="h-screen w-1/6 bg-gray-200 rounded-md grid place-items-center">
        <h6>Sidebar</h6>
      </div>
      <div className="h-screen w-5/6 rounded-md flex flex-col gap-4">
        <div className="rounded-md w-full py-1 flex justify-between items-center px-4">
          <div>
            <ChevronLeft className="stroke-gray-400" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 grid place-items-center">
              <User2 className="stroke-gray-400" />
            </div>
            <LogoutButton />
          </div>
        </div>
        <div className="bg-gray-200 rounded-md w-full h-4/6 grid place-items-center">
          <h6>Main</h6>
        </div>
        <div className="bg-gray-200 rounded-md w-full h-1/6 grid place-items-center">
          <h6>Footer</h6>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
