import { iconDoubleLeftChevron, iconDoubleRightChevron, iconLeftChevron, iconRightChevron } from "../icons/icons";
import ItemPagination from "./itemPagination";

interface PaginationCardsProps {
    allPages: number;
    setCurrentPage(newState: number): void;
    currentPage: number;
}

export default function PaginationCards({allPages, setCurrentPage, currentPage}: PaginationCardsProps) {


    return(
        <div className="flex w-full items-center justify-center">
            <ul className="flex gap-2">
                <ItemPagination
                    setCurrentPage={() => setCurrentPage(0)}
                    disabled={currentPage === 0}
                >
                    {iconDoubleLeftChevron('w-6 h-6')}
                </ItemPagination>
               
                <ItemPagination
                    setCurrentPage={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    {iconLeftChevron('w-6 h-6')}
                </ItemPagination>

                {currentPage !== 0 && (
                    <ItemPagination

                        setCurrentPage={() => setCurrentPage(currentPage - 1)}
                    >
                       {currentPage}
                    </ItemPagination>
                )}
                    <ItemPagination

                        setCurrentPage={() => setCurrentPage(currentPage)}
                        className={`bg-blue-700 text-lg text-white`}
                    >
                        {currentPage + 1}
                    </ItemPagination>

               {currentPage+1 !== allPages &&(
                <ItemPagination
                    setCurrentPage={() => setCurrentPage(currentPage + 1)}
                >
                    {currentPage + 2}
                </ItemPagination>
               )}

                <ItemPagination
                    setCurrentPage={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage + 1 === allPages}
                >
                    {iconRightChevron('w-6 h-6')}
                </ItemPagination>

                <ItemPagination
                    setCurrentPage={() => setCurrentPage(allPages - 1)}
                    disabled={currentPage + 1 === allPages}
                >
                    {iconDoubleRightChevron('w-6 h-6')}
                </ItemPagination>
            </ul>
      </div>
    )
}