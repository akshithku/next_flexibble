import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import Button from "./Button";

import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  // const session = await getCurrentUser();
  const session = null;

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Flexibble" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {/* {session?.user ? (
          <>
           <ProfileMenu session={session}/>
            <Link href="/profile">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )} */}
        {session? (
          <>
           <ProfileMenu session={session}/>
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
            <Link href="/create-project">
              <Button title='Share work' />
            </Link>

      </div>
    </nav>
  );
};

export default Navbar;
