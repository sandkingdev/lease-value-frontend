import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { getReportTitlesOfUser } from "../config";

const ReportList = () => {
  const navigate = useNavigate();
  const [reportTitleList, setReportTitleList] = useState<string[]>([]);
  const [filteredReportTitleList, setFilteredReportTitleList] = useState<string[]>([]);
  const [user, setUser] = useState(null);
  const [reportTitle, setReportTitle] = useState<string>();

  // Get user session on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("data: ", data);
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      // @ts-ignore
      setUser(data.user); // Save user info
      if (data.user) {
        const reportTitleList = await getReportTitlesOfUser(data.user.id);
        if (reportTitleList) {
          setReportTitleList(reportTitleList);
          setFilteredReportTitleList(reportTitleList);
        }
      }
    };
    fetchUser();
  }, []);

  const handleSelectedReportTitle = (item: string) => {
    localStorage.setItem("lease-value-user", (user as any).id);
    localStorage.setItem("lease-value-report-title", item);

    navigate('/report-template');
  }

  useEffect(() => {
    if (reportTitle) {
      const filteredReporTitleist = reportTitleList.filter((item) => item.includes(reportTitle ?? ''));
      setFilteredReportTitleList(filteredReporTitleist);
    } else {
      setFilteredReportTitleList(reportTitleList);
    }
  }, [reportTitle])

  return (
    <main className="mx-3 md:mx-10">
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <Link className="report-list-link mb-10" to="/report-template">
        ◄ Report Template
      </Link>
      <div className="main-container gap-y-5 p-4 lg:p-8">
        <h1 className="header-text text-3xl md:text-4xl">This is a Report List</h1>

        <div className="flex">
          <input className='flex w-full text-sm text-rich-black-light-4 font-medium h-10 bg-transparent focus-visible:outline-0 ' placeholder="Search report title" onChange={(e) => setReportTitle(e.target.value)} />
        </div>

        <div className={`bg-white/30 flex flex-col gap-y-2 overflow-y-auto w-full`}>
          {filteredReportTitleList.map((item: string, index: number) => (
            <div key={index} className={`py-0.5 px-1 cursor-pointer`} onClick={() => handleSelectedReportTitle(item)}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReportList;
