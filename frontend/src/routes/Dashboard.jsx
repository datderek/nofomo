import { useOutletContext } from 'react-router-dom';
import NavigationPanel from '../components/NavigationPanel/NavigationPanel';

export default function DashboardPage() {
  const [user] = useOutletContext();
  console.log(user);

  return (
    <>
      <div className="w-screen min-h-screen flex justify-center">
        <div className="max-w-[1200px] h-[1000px] w-full grid grid-cols-[250px_1fr_250px] gap-x-6">
          <div className="sticky top-20 h-min p-2">
            <NavigationPanel />
          </div>
          <div className="flex-grow w-full h-full bg-red-200"></div>
          <div className="sticky top-20 flex-none h-[400px] bg-green-200"></div>
        </div>
      </div>
    </>
  );
}
