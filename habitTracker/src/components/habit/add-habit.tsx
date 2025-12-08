import { useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useInsertDailyTasks } from "@/hooks/mutations/use-insert-daily-tasks";

type HabitType = "task" | "habit";

const WEEKDAYS = [
  { label: "S", value: 0 },
  { label: "M", value: 1 },
  { label: "T", value: 2 },
  { label: "W", value: 3 },
  { label: "T", value: 4 },
  { label: "F", value: 5 },
  { label: "S", value: 6 },
];

export default function AddHabit() {
  const { closeModal } = useModalStore();

  const today = new Date().toISOString().split("T")[0];

  const [type, setType] = useState<HabitType>("task");
  const [name, setName] = useState("");
  const [date, setDate] = useState(today || "");
  const [isDone, setIsDone] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const { mutate: createDailyTask, isPending: isCreatePending } =
    useInsertDailyTasks();

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    if (type === "task") {
      try {
        createDailyTask({
          name,
          is_done: isDone,
          task_date: date,
        });
      } catch (error) {
        console.error("Error submitting habit:", error);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto min-[420px]:w-[420px]">
      <CardHeader>
        <CardTitle className="text-xl text-center">Add New Item</CardTitle>
        <CardDescription className="text-center">
          Create a new daily task or recurring habit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Toggle */}
          <div className="flex p-1 bg-muted rounded-lg">
            <button
              type="button"
              onClick={() => setType("task")}
              className={cn(
                "flex-1 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
                type === "task"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Daily Task
            </button>
            <button
              type="button"
              onClick={() => setType("habit")}
              className={cn(
                "flex-1 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
                type === "habit"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Habit (Recurring)
            </button>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder={
                type === "habit"
                  ? "e.g. Morning Jog, Read Book"
                  : "e.g. Finish Report"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Dynamic Fields */}
          {type === "habit" ? (
            <div className="space-y-3">
              <Label>Frequency</Label>
              <div className="flex justify-between gap-1">
                {WEEKDAYS.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => toggleDay(day.value)}
                    className={cn(
                      "w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center border transition-all",
                      selectedDays.includes(day.value)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-input hover:border-primary hover:text-primary"
                    )}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center pt-1">
                Select the days you want to perform this habit
              </p>
            </div>
          ) : (
            // daily tasks, to do list
            <div className="space-y-2">
              <Label htmlFor="is_done">Done?</Label>
              <ul className="w-full flex gap-2">
                <li className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full cursor-pointer",
                      isDone && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setIsDone(true)}
                  >
                    Yes
                  </Button>
                </li>
                <li className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full cursor-pointer",
                      !isDone && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setIsDone(false)}
                  >
                    No
                  </Button>
                </li>
              </ul>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                placeholder={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full webkit-appearance-none"
              />
              <p className="text-xs text-muted-foreground">
                This task will appear on the calendar for the selected date
              </p>
            </div>
          )}

          <div className="flex justify-between gap-3">
            <Button
              type="submit"
              className="flex-1 cursor-pointer"
              disabled={isCreatePending}
            >
              {type === "habit" ? "Create Habit" : "Add Task"}
            </Button>
            <Button
              type="button"
              className="flex-1 bg-gray-500 cursor-pointer"
              onClick={closeModal}
            >
              Close
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
