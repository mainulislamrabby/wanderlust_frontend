"use client";

import { useState, type FormEvent } from "react";
import { Pencil, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

interface DestinationData {
  _id?: string;
  id?: string;
  name?: string;
  country?: string;
  category?: string;
  price?: number | string;
  duration?: string;
  departure?: string;
  image?: string;
  description?: string;
}

interface EditDestinationProps {
  destination?: DestinationData;
}

export default function EditDestination({ destination }: EditDestinationProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(destination?.category ?? "");
  const [form, setForm] = useState<DestinationData>({
    ...destination,
    name: destination?.name ?? "",
    country: destination?.country ?? "",
    category: destination?.category ?? "",
    price: destination?.price ?? "",
    duration: destination?.duration ?? "",
    departure: destination?.departure?.slice(0, 10) ?? "",
    image: destination?.image ?? "",
    description: destination?.description ?? "",
  });

  const categories =
    category && !CATEGORIES.includes(category)
      ? [category, ...CATEGORIES]
      : CATEGORIES;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { _id, ...updateData } = form;

    const token = await getTokenFromClient();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${destination?._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      },
    );

    const data = await res.json();

    console.log(data);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="cursor-pointer" />
        }
      >
        <Pencil />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update Travel Package</DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-6">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="edit-destination-name">Destination Name</Label>
              <Input
                id="edit-destination-name"
                placeholder="Bali Paradise"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-destination-country">Country</Label>
                <Input
                  id="edit-destination-country"
                  placeholder="Indonesia"
                  value={form.country}
                  onChange={(event) =>
                    setForm({ ...form, country: event.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-destination-category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "")}
                >
                  <SelectTrigger
                    id="edit-destination-category"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-destination-price">Price (USD)</Label>
                <Input
                  id="edit-destination-price"
                  type="number"
                  min="0"
                  placeholder="e.g., 1299"
                  value={form.price}
                  onChange={(event) =>
                    setForm({ ...form, price: event.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-destination-duration">Duration</Label>
                <Input
                  id="edit-destination-duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  value={form.duration}
                  onChange={(event) =>
                    setForm({ ...form, duration: event.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-destination-departure">Departure Date</Label>
              <Input
                id="edit-destination-departure"
                type="date"
                value={form.departure}
                onChange={(event) =>
                  setForm({ ...form, departure: event.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-destination-image">Image URL</Label>
              <Input
                id="edit-destination-image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={(event) =>
                  setForm({ ...form, image: event.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-destination-description">Description</Label>
              <Textarea
                id="edit-destination-description"
                placeholder="Describe the travel experience..."
                className="min-h-36"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-destructive/30 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive"
            >
              <Trash2 />
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-sky-500 text-white hover:bg-sky-600"
            >
              <Save className="size-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
