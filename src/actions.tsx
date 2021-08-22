import Airtable from "airtable";
import Record from "airtable/lib/record";
import { FieldSet } from "airtable/lib/field_set";
import { ClassRecord } from "./constants";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base(
  "app8ZbcPx7dkpOnP0"
);

const getStudent = (name: string) => {
  return new Promise<Record<FieldSet> | null>((resolve, reject) => {
    base("Students")
      .select({
        maxRecords: 1,
        filterByFormula: `Name='${name}'`,
      })
      .firstPage(function (err, records) {
        if (err) {
          return reject(err);
        }
        if (records!.length === 0) {
          return resolve(null);
        }
        records!.forEach(function (record) {
          return resolve(record);
        });
      });
  });
};

const find = (id: string, base_name: "Classes" | "Students") => {
  return new Promise<Record<FieldSet> | null>((resolve, reject) => {
    base(base_name).find(id, function (err, record) {
      if (err) {
        return reject(err);
      }
      return resolve(record!);
    });
  });
};

export const getStudentInfo = async (name: string) => {
  const record = await getStudent(name);
  if (record) {
    const class_ids = record.fields.Classes as ReadonlyArray<string>,
      classes = await Promise.all(class_ids.map((id) => find(id, "Classes")));
    const class_info = classes.map((record) => {
      const getClassStudents = async () => {
        const student_ids = record?.fields?.Students as ReadonlyArray<string>,
          students = await Promise.all(
            student_ids.map((id) => find(id, "Students"))
          ),
          student_names = students.map(
            (record) => record?.fields?.Name as string
          );
        return {
          ...record?.fields,
          Students: student_names,
        } as ClassRecord;
      };
      return getClassStudents();
    });
    return await Promise.all(class_info);
  }
  return null;
};
