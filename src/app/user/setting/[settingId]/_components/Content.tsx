'use client';
import ContentProfile from "./contentProfile/ContentProfile";

const renderContent = (settingId: string) => {
  switch(settingId) {
    case 'profile':
      return <ContentProfile />
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
