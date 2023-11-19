import ClassItem, { ClassInfo } from "./ClassItem";

const ListClass = () => {
    const tempList = [
        { name: "CNPM - TH2020/1", creator: "Khoa Ngo Ngoc Dang", avatar: "https://github.com/shadcn.pn" },
        { name: "Data Structures - Fall 2021", creator: "John Doe", avatar: "https://github.com/johndoe" },
        { name: "Algorithms - Spring 2022", creator: "Jane Smith", avatar: "https://github.com/janesmith" },
        { name: "Web Development - Summer 2022", creator: "Alex Johnson", avatar: "https://github.com/alexjohnson" },
        // Add more items as needed
    ];

    return (
        <div className="flex items-center gap-6 flex-wrap">
            {tempList.map((item: ClassInfo, index) => {
                return <ClassItem item={item} key={index} />;
            }, [])}
        </div>
    );
};

export default ListClass;
