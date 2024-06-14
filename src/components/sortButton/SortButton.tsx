import { MdOutlineSort } from 'react-icons/md'

export default function SortButton({handleFilterOptionClick}:any) {

  return (
    <div className="relative group">
    <div className="flex border h-12 items-center px-2 border-zinc-300 gap-2 rounded-md cursor-pointer group">
      <span>Sort</span> <MdOutlineSort />
    </div>
    <div className="absolute z-10 top-12 right-0 hidden group-hover:block bg-white border border-gray-200 rounded-md py-1 w-max">
      <div
        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleFilterOptionClick("a-z")}
      >
        A-Z
      </div>
      <div
        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleFilterOptionClick("reset")}
      >
        Reset
      </div>
    </div>
  </div>
  )
}
