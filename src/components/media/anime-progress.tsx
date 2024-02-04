"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
} from "@/components/ui/dialog";
import {
      Drawer,
      DrawerClose,
      DrawerContent,
      DrawerDescription,
      DrawerFooter,
      DrawerHeader,
      DrawerTitle,
      DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { getUserProgress, updateUserProgress } from "@/app/(actions)";
import { MediaList, MediaListStatus } from "@/__generated__/graphql";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "../ui/select";
import { usePathname } from "next/navigation";

const status = Object.keys(MediaListStatus).map((key) => ({
      label: key,
      value: MediaListStatus[key as keyof typeof MediaListStatus],
}));

export function AnimeProgress({ id, total }: { id: number; total: number }) {
      const [open, setOpen] = useState(false);
      const isDesktop = useMediaQuery("(min-width: 768px)");

      const [userProgress, setUserProgress] = useState<MediaList | null>(null);

      const [_, StartTransition] = useTransition();

      useEffect(() => {
            StartTransition(async () => {
                  const res = await getUserProgress(id);
                  setUserProgress(res as MediaList);
            });
      }, [id, open]);

      if (isDesktop) {
            return (
                  <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                              <Button
                                    role="button"
                                    aria-label="Edit progress"
                                    variant="outline"
                              >
                                    <Edit size={16} />
                              </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                    <DialogTitle>Progress</DialogTitle>
                                    <DialogDescription>
                                          Track your progress here. Click save
                                          when you&apos;re done.
                                    </DialogDescription>
                              </DialogHeader>
                              <ProgressModal
                                    mediaId={id}
                                    total={total}
                                    data={userProgress}
                                    setOpen={setOpen}
                              />
                        </DialogContent>
                  </Dialog>
            );
      }

      return (
            <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                        <Button
                              role="button"
                              aria-label="Edit progress"
                              variant="outline"
                        >
                              <Edit size={16} />
                        </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                        <DrawerHeader className="text-left">
                              <DrawerTitle>Progress</DrawerTitle>
                              <DrawerDescription>
                                    Track your progress here. Click save when
                                    you&apos;re done.
                              </DrawerDescription>
                        </DrawerHeader>
                        <ProgressModal
                              total={total}
                              data={userProgress}
                              className="px-4"
                              mediaId={id}
                              setOpen={setOpen}
                        />
                        <DrawerFooter className="pt-2">
                              <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                              </DrawerClose>
                        </DrawerFooter>
                  </DrawerContent>
            </Drawer>
      );
}

function ProgressModal({
      className,
      data,
      total,
      mediaId,
      setOpen,
      ...props
}: React.ComponentProps<"form"> & {
      data?: MediaList | null;
      total: number | undefined;
      mediaId: number;
      setOpen: (open: boolean) => void;
}) {
      const [_, StartTransition] = useTransition();

      const pathname = usePathname();

      const quantityMeasure = pathname.startsWith("/anime")
            ? "episodes"
            : "chapter";

      return (
            <form
                  action={async (data) => {
                        StartTransition(async () => {
                              await updateUserProgress(data);
                              setOpen(false);
                        });
                  }}
                  className={cn("grid items-start gap-4", className)}
                  {...props}
            >
                  <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue={data?.status || ""}>
                              <SelectTrigger
                                    className="h-10 w-full"
                                    id="status"
                              >
                                    <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                    {status.map((item) => (
                                          <SelectItem
                                                key={item.value}
                                                value={item.value}
                                          >
                                                {item.label}
                                          </SelectItem>
                                    ))}
                              </SelectContent>
                        </Select>
                  </div>
                  <div className="grid gap-2">
                        <Label htmlFor="score">Score</Label>
                        <Input
                              id="score"
                              type="number"
                              name="score"
                              min={0}
                              max={10}
                              defaultValue={data?.score as number}
                        />
                  </div>
                  <div className="grid gap-2">
                        <Label htmlFor={quantityMeasure} className="capitalize">
                              {quantityMeasure}
                        </Label>
                        <Input
                              name="progress"
                              id={quantityMeasure}
                              type="number"
                              min={0}
                              max={total}
                              defaultValue={data?.progress as number}
                        />
                  </div>
                  <Input
                        className="hidden"
                        value={mediaId}
                        readOnly
                        name="id"
                  />
                  <Button type="submit">Save changes</Button>
            </form>
      );
}
