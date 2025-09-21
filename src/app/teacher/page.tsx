"use client";

import Link from "next/link";
import { useStudentStore } from "../store/studentStore";
import { useState } from "react";

type SortKey = "firstName" | "lastName" | "gpa";
type SortOrder = "asc" | "desc";

export default function TeacherPage() {
  const students = useStudentStore((s) => s.students);
  const [sortKey, setSortKey] = useState<SortKey>("firstName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedStudents = [...students].sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];
    if (typeof valA === "string" && typeof valB === "string") {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">รายชื่อนักเรียน</h1>
      <table className="border w-full shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 cursor-pointer" onClick={() => handleSort("firstName")}>
              ชื่อ {sortKey === "firstName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="border px-2 cursor-pointer" onClick={() => handleSort("lastName")}>
              นามสกุล {sortKey === "lastName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="border px-2 cursor-pointer" onClick={() => handleSort("gpa")}>
              GPA {sortKey === "gpa" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="border px-2">รูปภาพ</th>
            <th className="border px-2">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border px-2">{s.firstName}</td>
              <td className="border px-2">{s.lastName}</td>
              <td className="border px-2">{s.gpa}</td>
              <td className="border px-2">
                {s.image && (
                  <img src={s.image} alt="student" className="w-12 h-12 object-cover rounded-full border" />
                )}
              </td>
              <td className="border px-2">
                <Link href={`/student/${s.id}`} className="text-blue-500 underline">
                  ดูเพิ่มเติม
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
