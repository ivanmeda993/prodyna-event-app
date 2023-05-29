"use client";

import Modal from "@/app/components/modals/Modal";
import useEventModal from "@/app/hooks/modal/useLoginModal";
import Heading from "@/app/(app)/components/Heading";
import { useMemo, useState } from "react";
import Button from "@/app/(app)/components/Button";
import { categories } from "@/app/(app)/components/nav/Categories";
import CategoryInput from "@/app/(app)/components/inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/(app)/components/inputs/Input";
import Textarea from "@/app/(app)/components/inputs/Textarea";
import Calendar from "@/app/(app)/components/inputs/Calendar";
import { Range } from "react-date-range";
import ImageUpload from "@/app/(app)/components/inputs/ImageUpload";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  INFO = 1,
  DATE = 2,
  IMAGE = 3,
}

const EventModal = () => {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      location: "",
      image: "",
      type: "",
      eventStartDate: "",
      eventEndDate: "",
      submissionEndDate: "",
    },
  });

  const eventType = watch("type");
  const title = watch("title");
  const shortDescription = watch("shortDescription");
  const longDescription = watch("longDescription");
  const location = watch("location");

  const imageSrc = watch("image");

  const { isOpen, onClose } = useEventModal();

  const onBack = () => {
    if (step === STEPS.CATEGORY) {
      return onClose();
    }

    setStep((v) => v - 1);
  };

  const onNext = () => {
    if (step === STEPS.CATEGORY && !eventType) {
      return toast.error("Please select a category");
    }
    if (
      step === STEPS.INFO &&
      !title &&
      !shortDescription &&
      !longDescription &&
      !location
    ) {
      return toast.error("Please fill in all fields");
    }

    if (step === STEPS.IMAGE) {
      return handleSubmit(onSubmit)();
    }
    setStep((v) => v + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { startDate, endDate } = dateRange;
    const dataToSubmit = {
      ...data,
      eventStartDate: startDate,
      eventEndDate: endDate,
    };

    await toast
      .promise(axios.post("/api/event", dataToSubmit), {
        loading: "Creating event...",
        success: "Event created!",
        error: "Failed to create event",
      })
      .then(() => {
        router.refresh();
        reset();
        onClose();
        setStep(STEPS.CATEGORY);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return "Cancel";
    }

    return "Back";
  }, [step]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8 w-full">
      <Heading title="Create an event" subtitle="Pick a category" />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(eventType) => setCustomValue("type", eventType)}
              selected={eventType === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4 w-full">
        <Heading
          title="Share some basics about your event"
          subtitle="Add a title, description and location"
        />
        <Input
          id="title"
          label="Title"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="location"
          label="Location"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="shortDescription"
          label="Short Description"
          register={register}
          errors={errors}
          required
        />

        <Textarea
          id="longDescription"
          label="Long Description"
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-4 w-full">
        <Heading
          title="When is your event?"
          subtitle="Add a date and time for your event and end time for attendees to RSVP"
        />
        <div className="w-full md:w-2/3 mx-auto">
          <p className="text-sm font-medium text-gray-500">Event Date</p>
          <Calendar
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
        </div>
        <Input
          label="Days before event to stop accepting submissions"
          id="submissionEndDate"
          type="number"
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("image", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-8">
        {bodyContent}

        <div className="flex items-center justify-between gap-16">
          <Button
            onClick={onBack}
            label={secondaryActionLabel}
            secondary
            fullWidth
          />
          <Button onClick={onNext} label={actionLabel} fullWidth />
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
