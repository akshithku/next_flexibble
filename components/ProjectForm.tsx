"use client";

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });

  const handleForSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const {token} = await fetchToken();
    try {
        if(type === 'create'){
            await createNewProject(form, session?.user?.id,token);
            router.push('/');
        }
    } catch (error) {
        console.log(error);
    } finally{
      setIsSubmitting(false);
    }
  };


  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please select an image file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleForSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/"
          required={type == "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Fiexbble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Title"
        state={form.title}
        placeholder="Fiexbble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Descripition"
        state={form.description}
        placeholder="Showcase and discover remarkable work from the flexibble community"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://localhost:3000"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/akshithku"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      {/*CustomInput Category... */}
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? " " : "/plus.svg"}
          isSubmitting={isSubmitting}
        ></Button>
      </div>
    </form>
  );
};

export default ProjectForm;
