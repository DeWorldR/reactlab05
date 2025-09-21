"use client";

import { useState, useRef } from "react";
import { useStudentStore } from "./store/studentStore";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const addStudent = useStudentStore((s) => s.addStudent);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    school: "",
    gpa: "",
    talent: "",
    reason: "",
    faculty: "",
    university: "",
  });

  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName) return alert("กรุณากรอกชื่อ-นามสกุล");

    const gpaNum = parseFloat(form.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) return alert("GPA ต้องอยู่ระหว่าง 0 - 4");

    let imageUrl = "";
    if (imageRef.current?.files?.[0]) {
      imageUrl = URL.createObjectURL(imageRef.current.files[0]);
    }

    addStudent({
      id: Date.now().toString(),
      ...form,
      gpa: gpaNum,
      image: imageUrl,
    });

    alert("บันทึกข้อมูลแล้ว");
    router.push("/teacher");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Portfolio Form</h1>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input name="firstName" placeholder="ชื่อ" onChange={handleChange} className="border p-2" />
        <input name="lastName" placeholder="นามสกุล" onChange={handleChange} className="border p-2" />
        <input name="address" placeholder="ที่อยู่" onChange={handleChange} className="border p-2" />
        <input name="phone" placeholder="เบอร์โทร" onChange={handleChange} className="border p-2" />
        <input name="school" placeholder="โรงเรียน" onChange={handleChange} className="border p-2" />
        <input name="gpa" placeholder="GPA" onChange={handleChange} className="border p-2" />
        <input name="talent" placeholder="ความสามารถพิเศษ" onChange={handleChange} className="border p-2" />
        <textarea name="reason" placeholder="เหตุผล" onChange={handleChange} className="border p-2" />
        <input name="faculty" placeholder="สาขาที่เลือก" onChange={handleChange} className="border p-2" />
        <input name="university" placeholder="มหาวิทยาลัย" onChange={handleChange} className="border p-2" />
        <input type="file" ref={imageRef} accept="image/*" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white py-2">บันทึก</button>
      </form>
    </div>
  );
}
