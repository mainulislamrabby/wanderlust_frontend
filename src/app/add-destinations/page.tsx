"use client";

import { useRef, useState, type FormEvent } from "react";
import { ListPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const FIELD_CLASSES = "bg-muted/50";

export default function AddDestinationPage() {
  const [category, setCategory] = useState("Beach");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newDestination = {
      ...Object.fromEntries(formData.entries()),
      category,
      price: Number(formData.get("price")),
    };

    try {
      const res = await fetch("http://localhost:5000/add-destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDestination),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add travel package");
      }

      console.log("Destination added:", data);
      setSubmitted(true);
      formRef.current?.reset();
      setCategory("Beach");
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  const handleCancel = () => {
    formRef.current?.reset();
    setCategory("Beach");
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-heading text-3xl font-semibold text-foreground">
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-8 max-w-3xl border bg-card p-6">
        <CardContent className="p-0">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Bali Paradise"
                className={FIELD_CLASSES}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  required
                  placeholder="Indonesia"
                  className={FIELD_CLASSES}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "")}
                >
                  <SelectTrigger
                    id="category"
                    className={`w-full ${FIELD_CLASSES}`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min={0}
                  required
                  placeholder="e.g., 1299"
                  className={FIELD_CLASSES}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  required
                  placeholder="e.g., 7 Days/6 Nights"
                  className={FIELD_CLASSES}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="departure">Departure Date</Label>
              <Input
                id="departure"
                name="departure"
                type="date"
                required
                className={`${FIELD_CLASSES} max-w-60`}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
                className={FIELD_CLASSES}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                rows={5}
                placeholder="Describe the travel experience..."
                className={`${FIELD_CLASSES} min-h-32`}
              />
            </div>

            <div className="flex flex-col items-end gap-3 pt-2">
              {submitted ? (
                <p className="w-full text-sm text-emerald-600" role="status">
                  Travel package submitted!
                </p>
              ) : null}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-sky-500 text-white hover:bg-sky-600"
                >
                  <ListPlus />
                  Add Travel Package
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
