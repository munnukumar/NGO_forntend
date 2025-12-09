// import React from "react";
// // import Navbar from "../../components/Navbar";
// import { Link } from "react-router-dom";
// import { usePublicAnalyticsQuery } from "../../services/api";

// export default function AdminDashboard() {
//   const { data: analytics } = usePublicAnalyticsQuery(undefined);
//   return (
//     <>
//       {/* <Navbar /> */}
//       <div className="max-w-5xl mx-auto p-4">
//         <div className="card">
//           <h2 className="text-xl font-semibold">Admin Dashboard</h2>
//           <div className="mt-3">Total Raised: ${(analytics?.totalRaisedCents / 100 || 0).toFixed(2)}</div>
//           <div className="mt-3">
//             <Link className="btn btn-primary" to="/admin/create-plan">Create Plan</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
