import StudentTable from "@/components/ui/studenttable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';

export default function Page() {
	return (
		<div className="space-y-6 sm:pl-4">
			<div className="flex flex-col sm:flex-row items-center justify-between">
				<div className="flex gap-4">
					<Select defaultValue="2024-25">
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Select Year" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="2024-25">AY 2024-25</SelectItem>
							<SelectItem value="2023-24">AY 2023-24</SelectItem>
						</SelectContent>
					</Select>
					<Select defaultValue="cbse9">
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Select Class" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="cbse9">CBSE 9</SelectItem>
							<SelectItem value="cbse10">CBSE 10</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<button className="px-4 py-2 flex gap-2 items-center justify-center rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
					<Plus className="h-4 w-4" />
					Add new student
				</button>
			</div>
			<StudentTable />
		</div>
	)
}

