"use client";

import { useParams } from "next/navigation";
import { useStudentStore } from "../../store/studentStore";

export default function StudentDetailPage() {
  const { id } = useParams();
  const student = useStudentStore((s) => s.students.find((st) => st.id === id));

  if (!student) return <div className="p-6">ไม่พบนักเรียน</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{student.firstName} {student.lastName}</h1>
      {student.image && (
        <img src={student.image} alt="student" className="w-40 h-40 object-cover rounded-lg mb-4 border" />
      )}
      <div className="grid gap-2">
        <p><b>ที่อยู่:</b> {student.address}</p>
        <p><b>เบอร์โทร:</b> {student.phone}</p>
        <p><b>โรงเรียน:</b> {student.school}</p>
        <p><b>GPA:</b> {student.gpa}</p>
        <p><b>ความสามารถพิเศษ:</b> {student.talent}</p>
        <p><b>เหตุผล:</b> {student.reason}</p>
        <p><b>สาขา:</b> {student.faculty}</p>
        <p><b>มหาวิทยาลัย:</b> {student.university}</p>
      </div>
    </div>
  );
}
