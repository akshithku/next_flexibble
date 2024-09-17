import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearch ={
  projectSearch:{
    edges:{node: ProjectInterface}[];
    pageinfo:{
      hasPreviousPage:boolean;
      hasNextPage:boolean;
      startCursor:string;
      endCursor:string;
    }
  }
}

const Home= async() => {
  
  const data = await fetchAllProjects() as ProjectSearch;

  const projectToDisplay = data?.projectSearch?.edges || [];
  // const projectToDisplay = [""];


  if(projectToDisplay.length === 0){
    return(
      <section className="flexStart flex-col paddings">
        Categories
        
        <p className="no-result-text text-center">No projects found, go create some first.</p>
      </section>
    )
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
      <section className="projects-grid">
        {projectToDisplay.map(({node} : {node: ProjectInterface}) => (
          <ProjectCard key={""}/>
        ))}
        {/* <ProjectCard key={""}/> */}
      </section>
      <h1>LoadMore</h1>
    </section>
  );
}

export default  Home