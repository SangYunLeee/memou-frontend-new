import Link from "next/link";

export default function SideBar({className, settingId}: {className: string, settingId: string}) {
  const isActive = (path: string) => path === settingId;
  return (
    <div className={className}>
      <Link href="/user/setting/profile" className={isActive("profile") ? "text-blue-500" : ""}>
        <p>프로필 설정</p>
      </Link>
      <Link href="/user/setting/password" className={isActive("password") ? "text-blue-500" : ""}>
        <p>비밀번호 설정</p>
      </Link>
      <Link href="/user/setting/category" className={isActive("category") ? "text-blue-500" : ""}>
        <p>카테고리 설정</p>
      </Link>
    </div>
  );
}
