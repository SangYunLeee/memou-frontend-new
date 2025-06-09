'use client';
import ContentProfile from "./contentProfile/ContentProfile";
import ContentPassword from "./contentPassword/ContentPassword";

const renderContent = (settingId: string) => {
  switch(settingId) {
    case 'profile':
      return <ContentProfile />
    case 'password':
      return <ContentPassword />
    default:
      return <div>404 Not Found</div>;
  }
};

export default function Content({className, settingId}: {className: string, settingId: string}) {
  return (
    <div className={className}>
      {renderContent(settingId)}
    </div>
  );
}
