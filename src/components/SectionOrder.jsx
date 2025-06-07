import React from "react";
import { useResume } from "../contexts/ResumeContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export const SectionOrder = () => {
  const { activeResume, reorderSections } = useResume();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderSections(result.source.index, result.destination.index);
  };

  const sectionLabels = {
    personalInfo: "Personal Information",
    summary: "Summary",
    education: "Education",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
  };

  return (
    <div className="section-order">
      <h2>Section Order</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {activeResume.sectionOrder.map((section, index) => (
                <Draggable key={section} draggableId={section} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="section-item"
                    >
                      {sectionLabels[section]}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};