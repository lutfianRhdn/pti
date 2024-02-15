import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Audiowide, Quicksand } from "next/font/google";

const audiowide = Audiowide({
	subsets: ['latin-ext'],
	weight: "400"
})
const quickSand = Quicksand({
	subsets: ['latin-ext'],
	style:'normal'
})
export default function Home() {
	return (
		<DefaultLayout>
			<div className="flex items-center justify-center h-[80vh]  flex-col gap-10">
				<div className=" bg-gradient-to-r from-gray-100 to-gray-500 p-[1px] rounded-xl">
					<div className=" px-10 py-3  backdrop-blur-sm bg-gray-900  rounded-xl">
						<h1 className={title({ size: 'lg', }) + ` ${audiowide.className} text-white  `}>SpaceVista</h1>
					</div>
				</div>
				<div className={title({ className: " text-white text-center text-xl " + quickSand.className, size:'sm'})}>
					Join us as we navigate the stars together and <br /> unlock the secrets of the cosmos at Space Vista.
				</div>
			</div>
		</DefaultLayout>
	);
}
