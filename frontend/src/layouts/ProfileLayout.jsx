import { Outlet, useOutletContext } from 'react-router-dom';

export default function ProfileLayout() {
  const [user, getToken] = useOutletContext();

  return (
    <div className="max-w-[750px] mx-auto">
      <Outlet context={[user, getToken]} />
    </div>
  );
}
