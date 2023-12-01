import React, { useEffect } from "react";
import axiosInstance from "../lib/axiosInstance";

function Info() {
  useEffect(() => {
    // get pid from params

    const response = axiosInstance.get("/api/patients");
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Personal Information</h1>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Result
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Cycle Threshold
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Blood Oxygen Level
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Breaths Per Minute
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                      Blood Oxigen Level
                    </td>
                    <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                      90
                    </td>
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500"></td>
                    <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                      Negative
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Testing Summary</h1>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Result
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Cycle Threshold
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Blood Oxygen Level
                    </th>
                    <th
                      scope="col"
                      class="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Breaths Per Minute
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                      Blood Oxigen Level
                    </td>
                    <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                      90
                    </td>
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500"></td>
                    <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                      Negative
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
