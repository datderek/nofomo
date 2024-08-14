import { Outlet } from 'react-router-dom';

export default function ProfileLayout() {
  return (
    <div className="max-w-[800px] mx-auto">
      <Outlet />
    </div>
  );
}
