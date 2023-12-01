import React, { useEffect, useState } from "react";
import { SortIcon, SortUpIcon, SortDownIcon } from "../../shared/Icons";

export default function Table({ data }) {
  const [sortConfig, setSortConfig] = useState({
    column: "",
    isAscending: true,
  });

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    const { column, isAscending } = sortConfig;
    if (column === "PRODUCT" || column === "SHOP") {
      setTableData((prev) => {
        return prev.sort((a, b) => {
          const compareResult = a[column.toLowerCase()].localeCompare(
            b[column.toLowerCase()]
          );
          return isAscending ? compareResult : -compareResult;
        });
      });
    }
  }, [sortConfig]);

  const handleSort = (column) => {
    setSortConfig((prev) => ({
      column,
      isAscending: prev.column === column ? !prev.isAscending : true,
    }));
  };

  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  const headers = [
    {
      text: "ID",
    },
    {
      text: "PATIENT",
    },
    {
      text: "GENDER",
    },
    {
      text: "ADDRESS",
    },
    {
      text: "PHONE NUMBER",
    },
    {
      text: "COMMORBITIES",
    },
  ];

  return (
    <div className="mt-4 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          {
            // Table header
            data.length > 0 ? (
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        id={index}
                        scope="col"
                        className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        onClick={() => handleSort(header.text)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between">
                          {header.text}
                          {sortConfig.column === header.text ? (
                            <span>
                              {sortConfig.isAscending ? (
                                <SortUpIcon className="w-4 h-4 text-gray-400" />
                              ) : (
                                <SortDownIcon className="w-4 h-4 text-gray-400" />
                              )}
                            </span>
                          ) : null}
                        </div>
                      </th>
                    ))}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tableData.map((row) => (
                      <tr key={row.id} onClick={ () => {
                        window.location.href = `/report/${row.patientId}`;
                      }}>
                        <td className="px-6 py-4 whitespace-nowrap description-cell">
                          {row.patientId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap description-cell">
                          {row.lastName + " " + row.middleName + " " + row.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap description-cell">
                          {row.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap description-cell">
                          <div className="flex items-center justify-between">
                            {row.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap description-cell">
                          {row.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap description-cell">
                          {row.comorbidities && row.comorbidities.length > 0 ? row.comorbidities.map((commorbity, index) => {
                            return (
                              <div key={index} className="flex items-center justify-between">
                                {(commorbity.comorbidity.charAt(0).toUpperCase() + commorbity.comorbidity.slice(1))}
                              </div>
                            );
                          }) : '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-gray-500">No data</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
